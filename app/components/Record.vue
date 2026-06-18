<script setup lang="ts">

/** Props Componentes */
const props = defineProps<{
  record: ProductRecord,
  styleTitle:string,
  contentIMG:string,
  subtitles:string,
  contentTarifas:string,
  description:string
}>()

const product = computed(() => props.record)

/** Array de imagenes */
const images = computed(() => product.value.product_images)

/** Index imagenes */
const i = ref(0)

const parent = computed(() => getParent(product.value))

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (!images.value.length) return

  intervalId = setInterval(() => {
    i.value = (i.value + 1) % images.value.length
  }, 3000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

</script>

<template>


  <!-- Imagen y Titulo -->
  <h2 :class="props.styleTitle">
    {{ product.name }}
    <UIcon :name="iconCategory(parent!)" />
  </h2>
  <div :class="props.contentIMG">
    <NuxtImg :src="IMAGE_URL + product.code + '/' +images[i]?.path" class="w-full h-full object-cover" />
  </div>

  <!-- Categorias -->
  <h3 :class="props.subtitles">Categorias</h3>


  <div class="grid grid-cols-3 gap-5 w-full">
    <UBadge v-for="category in product.categories_products ?? []" :key="category.categories?.name"
      :label="category.categories?.name ?? 'Sin categoría'" color="warning" class="w-20 h-10 font-bold" size="md"
      :ui="{ base: 'flex items-center justify-center' }" />
  </div>

  <!-- Tarifas -->
  <h3 :class="props.subtitles" >Tarifas</h3>
  <div :class="props.contentTarifas" >
    <Rate v-for="rate in product.rates" :key="rate.id" :rate="rate" />
  </div>

  <!-- Descripcion -->
  <h3 :class="props.subtitles">Descripcion</h3>
  <div class="w-full">
    <p :class="props.description">
      {{ product.description ?? 'Sin descripción' }}
    </p>
  </div>



</template>