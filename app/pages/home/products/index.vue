<script setup lang="ts">
definePageMeta({
  title: "Lista de Productos"
})

/** Composables  & Apis  &  Service*/
const { filter, order, orderBy , items , record ,listOrders , reciveProduct } = useProducts()

</script>

<template>
  <div class="flex flex-col gap-4 h-full p-10">

    <!-- Filtros de Busqueda -->
    <div class="w-full h-12 bg-blue-950/40 rounded-2xl flex items-center px-4">
      <h2>Filtrar por:</h2>
      <USelect :items="items" default-value="todos" class="w-35 mx-3 capitalize" v-model="filter" />
      <h2> Ordenar Lista por :</h2>
      <USelect :items="order" default-value="defecto" class="w-35 mx-3 capitalize" v-model="orderBy"  />
    </div>

    <!-- Contenido principal -->
    <div class="flex gap-4 flex-1 overflow-hidden">

      <!-- Grid -->
      <div
        class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <div class="grid grid-cols-2 gap-4 content-start">
          <Card v-for="product in listOrders" :product="product" :filter="filter" @product="reciveProduct" />
        </div>
      </div>

      <!-- Panel lateral - Mostrar Producto -->
      <div
        class="w-96 shrink-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-thumb-rounded-full">
          <Record variant="min-h-full" :record="record" />
      </div>

    </div>
  </div>
</template>



