<script setup lang="ts">

definePageMeta({
  title: "Lista de Productos"
})

/** Composables  & Apis  &  Service*/
const { filter, order, orderBy, items, record, listOrders, reciveProduct, isOpen } = useProducts();


</script>

<template>
  <div class="flex flex-col gap-4 h-full p-10">

    <!-- Filtros de Busqueda -->
    <div class="w-full h-12 bg-blue-950/40 rounded-2xl flex items-center px-4">


      <h2>Filtrar por:</h2>
      <USelect :items="items" default-value="todos" class="w-35 mx-3 capitalize" v-model="filter" />


      <h2>Ordenar Lista por:</h2>
      <USelect :items="order" default-value="defecto" class="w-35 mx-3 capitalize" v-model="orderBy" />




    </div>

    <!-- Contenido principal -->
    <div class="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">

      <!-- Grid -->
      <div
        class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <div class="grid grid-cols-3 gap-4 content-start">
          <Card v-for="product in listOrders" :product="product" :filter="filter" @product="reciveProduct"
            @click="isOpen = !isOpen" />
        </div>
      </div>


      <!--
      <div
        class="w-full lg:w-96 shrink-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-thumb-rounded-full  max-[1024px]:hidden lg:block">

        <div v-if="!record" class="bg-blue-900 rounded-2xl p-4 min-h-full flex items-center justify-center">
          <h2 class="text-xl text-blue-300 italic font-semibold">Selecciona un producto</h2>
        </div>

        <div v-else="record" class="bg-blue-900 rounded-2xl p-4 min-h-full">
          <div class="bg-blue-300 rounded-2xl w-full flex flex-col gap-3 p-4">
            <Record 
            :record="record"
            style-title="text-black font-bold text-xl"
            content-i-m-g="h-48 w-full rounded-2xl bg-white overflow-hidden shadow-2xl"
            subtitles="text-black font-semibold text-md"
            contentTarifas="flex flex-col gap-2 w-full"
            description="text-black text-sm font-light leading-relaxed break-all"

            />
          </div>
        </div>




      </div>

      --->


      <SideBarRight class="min-[1024px]" :is-open="isOpen" content="w-[35%] sm:w-[30%]" scroll="overflow-y-auto">
        <div class="h-full flex flex-col ">
          <div class="shrink-0">
            <UButton icon="lucide:x" @click="isOpen = !isOpen" color="error" class="cursor-pointer" />
            <div class="w-full h-10"></div>
          </div>

          <div
            class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            <div v-if="!record" class="bg-blue-900 rounded-2xl p-4 min-h-full flex items-center justify-center">
              <h2 class="text-xl text-blue-300 italic font-semibold">Selecciona un producto</h2>
            </div>

            <Record v-else :record="record" style-title="text-white font-bold text-2xl mb-2"
              subtitles="mt-3 italic mb-3" 
              image="h-70 w-full rounded-2xl bg-white overflow-hidden shadow-2xl"
              content-tarifas="flex flex-col gap-2 w-full"
              description="text-white text-sm font-light leading-relaxed break-all"
              categories="flex flex-wrap gap-3 w-full" />
          </div>
        </div>
      </SideBarRight>






    </div>
  </div>
</template>
