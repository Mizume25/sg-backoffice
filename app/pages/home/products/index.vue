<script setup lang="ts">
definePageMeta({
  title: "Lista de Productos"
})

/** Composables */
const { filter, order, orderBy, reciveParent } = useProductIndex()

/** Api Project */
const { data: products, refresh } = await useFetch('/api/products');

/** Hacemos reactivos los elmenots padre */
const parents = computed(() => getAllParents(products.value ?? []));

/** Opciones del Select */
const items = ['Todos', ...parents.value]

/** Listas en ordern disponibles */
const listOrders = computed(() => {
  const list = [...(products.value ?? [])]

  switch (orderBy.value) {
    case order.value[1]:
      return list.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return list
  }
})




</script>

<template>
  <div class="flex flex-col gap-4 h-full p-10">

    <!-- Filtros de Busqueda -->
    <div class="w-full h-12 bg-blue-950/40 rounded-2xl flex items-center px-4">
      <h2>Filtrar por:</h2>
      <USelect :items="items" default-value="todos" class="w-35 mx-3 capitalize" v-model="filter" />
      <h2> Ordenar Lista por :</h2>
      <USelect :items="order" default-value="defecto" class="w-35 mx-3 capitalize" v-model="orderBy" />
    </div>

    <!-- Contenido principal -->
    <div class="flex gap-4 flex-1 overflow-hidden">

      <!-- Grid -->
      <div
        class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <div class="grid grid-cols-2 gap-4 content-start">
          <Card v-for="product in listOrders" :product="product" :filter="filter" @parent="reciveParent" />
        </div>
      </div>

      <!-- Panel lateral - Mostrar Producto -->
      <div class="w-96 shrink-0">
        <div
          class="sticky top-4 bg-blue-900 rounded-2xl p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar-thumb-rounded-full max-h-[calc(100vh-8rem)]">
          <div class="bg-blue-300 rounded-2xl w-full flex flex-col gap-3 p-4">

            <!-- Imagen y Titulo -->
            <h2 class="text-black font-bold text-xl">Nombre de Producto</h2>
            <div class="h-48 w-full rounded-2xl bg-white overflow-hidden shadow-2xl">
              <NuxtImg src="/carnes/ternera/filete2.webp" class="w-full h-full object-cover" />
            </div>

            <!-- Categorias -->
            <h3 class="text-black font-semibold text-md">Categorias</h3>
            <div class="grid grid-cols-3 gap-2 w-full">
              <UBadge label="categoria" color="warning" class="w-20 h-10 font-bold" size="md"
                :ui="{ base: 'flex items-center justify-center' }" />
              <UBadge label="categoria" color="warning" class="w-20 h-10 font-bold" size="md"
                :ui="{ base: 'flex items-center justify-center' }" />
            </div>

            <!-- Tarifas -->
            <h3 class="text-black font-semibold text-md">Tarifas</h3>
            <div class="flex flex-col gap-2 w-full">
              <div class="h-20 w-full bg-blue-200 rounded-xl"></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>




<style lang="scss" scoped>
.mask {
  mask-image: linear-gradient(to right, transparent, black 4%, black 93%, transparent);
}
</style>