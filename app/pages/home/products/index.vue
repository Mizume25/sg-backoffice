<script setup lang="ts">
definePageMeta({
  title: "Lista de Productos"
})


/** Composables  & Apis */
const { filter, order, orderBy } = useProductIndex()
const { data: products } = await useFetch('/api/products');

/** Elementos Reactivos y Modificados  */
const parents = computed(() => getAllParents(products.value ?? []));
const items = ['Todos', ...parents.value] // "Todos" como filtro de categoria 

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

const record: Ref<ProductRecord | undefined> = ref(listOrders.value[0])
  

/** Filtraremos la funcion de obtener el id y etornaremos el json corespondiente */
const reciveProduct = (product: string | undefined): void => {

  if(product == null) return

  record.value = listOrders.value.find((p) => p.id === product) ?? null;
}




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



