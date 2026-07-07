<script setup lang="ts">

definePageMeta({
  title: "Lista de Productos"
})

/** Composables  & Apis  &  Service*/
const { filter, order, orderBy, record, currentProducts, reciveProduct, isOpen, parents , downloadExcel } = useProducts();



const openSide = () => isOpen.value = isOpen.value == false ? true : true;
const filtersOpen = ref(false)

</script>

<template>
  <!-- Main -->
  <div class="flex flex-col gap-4 h-full p-10">

    <!-- Botón toggle: solo visible en móvil -->
    <UButton class="md:hidden" icon="lucide:sliders-horizontal" label="Filtros" @click="() => {filtersOpen = !filtersOpen}" />

    <!-- La barra: siempre visible en desktop, toggleable en móvil -->
    <div :class="{ 'max-md:hidden': !filtersOpen }" class="w-full bg-blue-950/40 rounded-2xl flex items-center gap-1 px-4 max-sm:text-sm
         max-md:flex-col max-md:items-center max-md:justify-center max-md:h-auto max-md:py-3 md:h-12">

      <h2>Filtrar por: </h2>
      <div class="flex items-center justify-center max-md:w-full">
        <USelectMenu :items="parents" v-model="filter" value-key="name" label-key="name" placeholder="Todos"
          class="w-30 mx-3 capitalize max-md:w-full" />
        <UButton v-if="filter" icon="lucide:x" color="neutral" variant="ghost" @click="filter = undefined"
          class="cursor-pointer" />
      </div>

      <h2>Ordenar Lista por: </h2>
      <USelect :items="order" class="w-35 mx-3 capitalize max-md:w-full" v-model="orderBy" />

      <UButton leading-icon="lucide:download" label="Excel" @click="downloadExcel"
        class="w-30 cursor-pointer max-md:w-30 mt-3" />
    </div>

    <!-- Contenido principal -->
    <div class="flex flex-col lg:flex-row gap-4 flex-1 overflow-y-auto max-sm:items-center">

      <!-- Grid -->
      <div
        class="flex-1 
        overflow-y-auto scrollbar-gutter-stable scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">

          <!-- Cards de Productos -->
          <Card v-for="product in currentProducts" :key="product.id" :product="product" @product="reciveProduct"
            @click="openSide" />
        </div>
      </div>

      <!--- Side Bar Lateral -->
      <SideBarRight class="min-[1024px]" :is-open="isOpen" content="min-lg:w-[35%] max-md:w-[100%]" scroll="overflow-y-auto">
        
         <!--- Header -->
        <div class="h-full flex flex-col ">
          <div class="shrink-0 mb-4">
            <UButton icon="lucide:x" @click="() => {isOpen = !isOpen}" color="error" class="cursor-pointer" />
          </div>

            <!--- Guard en caso de que no haya producto -->
          <div
            class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            <div v-if="!record" class="bg-blue-900 rounded-2xl p-4 min-h-full flex items-center justify-center">
              <h2 class="text-xl text-blue-300 italic font-semibold">Selecciona un producto</h2>
            </div>
            
             <!--- Componente que renderiza producto -->
            <Product v-else :record="record" style-title="text-white font-bold text-2xl mb-2"
              subtitles="mt-3 italic mb-3"
              image="relative h-[280px] w-full shrink-0 rounded-2xl bg-white overflow-hidden shadow-2xl"
              description="text-white text-sm font-light leading-relaxed break-all"
              categories="flex flex-wrap gap-3 w-full" />
          </div>
        </div>
      </SideBarRight>

    </div>
  </div>
</template>
