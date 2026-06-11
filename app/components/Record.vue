<script setup lang="ts">

/** Props Componentes */
const props = defineProps<{
  record?: ProductRecord
  variant?: string
}>()

const product = computed(() => props.record)

/** Array de imagenes */
const images = computed(() => product.value?.product_images ?? [])

/** Index imagenes */
const i = ref(0)

const parent = computed(() => product.value ? getParent(product.value) : null)

/** Variable circular */
onMounted(() => {
  watchEffect((onCleanup) => {
    if (!images.value.length) return

    const interval = setInterval(() => {
      i.value = (i.value + 1) % images.value.length
    }, 3000)

    onCleanup(() => clearInterval(interval))
  })
})

</script>

<template>
  <div v-if="product" class="bg-blue-900 rounded-2xl p-4" :class="variant">
    <div class="bg-blue-300 rounded-2xl w-full flex flex-col gap-3 p-4">

      <!-- Imagen y Titulo -->
      <h2 class="text-black font-bold text-xl">
        {{ product.name }} {{ parent ? iconCategory(parent) : '' }}
      </h2>
      <div class="h-48 w-full rounded-2xl bg-white overflow-hidden shadow-2xl">
        <NuxtImg :src="images[i]?.path ?? ''" class="w-full h-full object-cover" />
      </div>

      <!-- Categorias -->
      <h3 class="text-black font-semibold text-md">Categorias</h3>
      <div class="grid grid-cols-3 gap-2 w-full">
        <UBadge
          v-for="category in product.categories_products ?? []"
          :key="category.categories?.name"
          :label="category.categories?.name ?? 'Sin categoría'"
          color="warning"
          class="w-20 h-10 font-bold"
          size="md"
          :ui="{ base: 'flex items-center justify-center' }" />
      </div>

      <!-- Tarifas -->
      <h3 class="text-black font-semibold text-md">Tarifas</h3>
      <div class="flex flex-col gap-2 w-full">
        <Rate
          v-for="rate in product.rates ?? []"
          :key="rate.id"
          :rate="rate" />
      </div>

      <!-- Descripcion -->
      <h3 class="text-black font-semibold text-md">Descripcion</h3>
      <div class="w-full">
        <p class="text-black text-sm font-light leading-relaxed break-all">
          {{ product.description ?? 'Sin descripción' }}
        </p>
      </div>

    </div>
  </div>

  <!-- Estado vacío -->
  <div v-else class="bg-blue-900 rounded-2xl p-4" :class="variant">
    <div class="bg-blue-300 rounded-2xl w-full flex items-center justify-center p-8">
      <p class="text-black font-light">Selecciona un producto</p>
    </div>
  </div>
</template>