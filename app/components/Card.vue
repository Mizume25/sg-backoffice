<script setup lang="ts">
import { type ProductRecord  } from '../../shared/types/definitons'

/** Propos del componente */
const props = defineProps<({
  product:ProductRecord,
  filter: string | undefined
})>()
const parent = computed(() => getParent(props.product))
const border = computed(() => colorCategory(parent.value))


/** Eventos del componente */
const emit = defineEmits<{
  product: [parent: string | undefined]
}>()

const handleProduct = () => {
  emit('product', props.product.id)
}


</script>

<template>
  <div 
    class="w-75 min-h-50 bg-blue-900 rounded-2xl border-4 shadow-2xl transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer hover:z-20"
    :class="border"
     @click="handleProduct"
     v-show="filter === 'Todos' || filter === parent"
    >
    <header class="w-full min-h-[25%] p-3 flex flex-col gap-y-1 ">
      <h2 class="font-bold ">
        <UIcon :name="iconCategory(parent)" class="me-2" /> {{ props.product.name }}
      </h2>
      <h3 class="font-light italic text-sm"> Categorias</h3>
      <div class="grid grid-cols-3 gap-2">
        <UBadge variant="solid" color="warning" v-for="cp in props.product.categories_products"
        :key="cp.categories?.id"
        :label="cp.categories?.name"
        class="capitalize"
        />


      </div>
    </header>

    <section class="w-full min-h-[75%] p-3">
      <h3 class="font-light italic text-sm"> Descripcion</h3>
      <p class="text-sm">{{ props.product.description }}</p>
    </section>

  </div>
</template>

<style scoped></style>
