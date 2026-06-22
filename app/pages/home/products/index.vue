<script setup lang="ts">

definePageMeta({
  title: "Lista de Productos"
})

/** Composables  & Apis  &  Service*/
const { filter, order, orderBy, items, record, listOrders, reciveProduct, isOpen } = useProducts();

/** Funcion que descarga un Excel */
async function downloadExcel() {
  try {
    const response = await fetch('/api/products/xlsx', { method: 'GET' })
    /** Convertimso en blob */
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'export.xlsx'
    a.click()


    URL.revokeObjectURL(url)
  } catch (error) {
    console.log(error)
  }

}

const openSide = () => isOpen.value = isOpen.value == false ? true : true; 


</script>

<template>
  <div class="flex flex-col gap-4 h-full p-10">

    <!-- Filtros de Busqueda -->
    <div class="w-full h-12 bg-blue-950/40 rounded-2xl flex items-center px-4 max-sm:text-sm">


      <h2>Filtrar por:</h2>
      <USelect :items="items" default-value="todos" class="w-35 mx-3 capitalize" v-model="filter" />


      <h2>Ordenar Lista por:</h2>
      <USelect :items="order" default-value="defecto" class="w-35 mx-3 capitalize" v-model="orderBy" />

      <!-- Exportacion de datos en Excel -->
      <UButton leading-icon="lucide:download" label="Excel" @click="downloadExcel" class="w-30 cursor-pointer" />


    </div>

    <!-- Contenido principal -->
    <div class="flex flex-col lg:flex-row gap-4 flex-1 overflow-y-auto max-sm:items-center">

      <!-- Grid -->
      <div
        class="flex-1 
        overflow-y-auto scrollbar-gutter-stable scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
          <Card v-for="product in listOrders" :product="product" :filter="filter" @product="reciveProduct"
            @click="openSide" />
        </div>
      </div>

      <!--- Side Bar Lateral -->
      <SideBarRight class="min-[1024px]" :is-open="isOpen" content="max-lg:w-[35%] max-md:w-[100%]"
        scroll="overflow-y-auto">
        <div class="h-full flex flex-col ">
          <div class="shrink-0">
            <UButton icon="lucide:x" @click="isOpen = !isOpen" color="error" class="cursor-pointer" />
          </div>

          <div
            class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            <div v-if="!record" class="bg-blue-900 rounded-2xl p-4 min-h-full flex items-center justify-center">
              <h2 class="text-xl text-blue-300 italic font-semibold">Selecciona un producto</h2>
            </div>

            <Record v-else :record="record" style-title="text-white font-bold text-2xl mb-2"
              subtitles="mt-3 italic mb-3" image="h-70 w-full rounded-2xl bg-white overflow-hidden shadow-2xl"
              content-tarifas="flex flex-col gap-2 w-full"
              description="text-white text-sm font-light leading-relaxed break-all"
              categories="flex flex-wrap gap-3 w-full" />
          </div>
        </div>
      </SideBarRight>






    </div>
  </div>
</template>
