<script setup lang="ts">

/** Props Componentes */
const props = defineProps<{
  record: ProductRecord,
  styleTitle: string,
  image: string,
  subtitles: string,
  contentTarifas: string,
  description: string
  categories: string
}>()

const product = computed(() => props.record)

/** Array de imagenes */
const images = computed(() => product.value.product_images)

/** Index imagenes */
const i = ref(0)

/**  Categoria padre */
const parent = computed(() => getParent(product.value))

/** INterval  */
let intervalId: ReturnType<typeof setInterval> | null = null


/** Iniciar intervalo de imagenes */
onMounted(() => {
  if (!images.value.length) return

  intervalId = setInterval(() => {
    i.value = (i.value + 1) % images.value.length
  }, 3000)
})

/** Termina intervalo */
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})


/** Funcion para descargar PDf */
async function downloadPDF() {
  const blob = await $fetch(`/api/pdf/${product.value.id}`, { method: 'GET', responseType: 'blob' })

  const url = URL.createObjectURL(blob as Blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${product.value.name} - ${product.value.code}`
  a.click()

  URL.revokeObjectURL(url);
}

/**
 * Borrado de producto
 * @param id string
 */
async function deleteProduct(id: string) {
  try {
    await useProductsApi().products.delete(id);

    useNotify().success('Se elimino el producto perfectamente')
    
  } catch (error) {
    useNotify().error('No se pudo eliminar el producto')
  }
}

</script>

<template>


  <!-- Imagen y Titulo -->
  <h2 :class="props.styleTitle">
    {{ product.name }}
    <UIcon :name="iconCategory(parent!)" />
  </h2>
  <div :class="props.image" class="relative">
    <NuxtImg :src="IMAGE_URL + product.code + '/' + images[i]?.path"
      class="absolute inset-0 w-full h-full object-cover" />
  </div>

  <!-- Categorias -->
  <h3 :class="props.subtitles">Categorias</h3>


  <div :class="props.categories">
    <UBadge v-for="category in product.categories_products ?? []" :key="category.categories?.name"
      :label="category.categories?.name ?? 'Sin categoría'" color="warning" class="w-20 h-10 font-bold" size="md"
      :ui="{ base: 'flex items-center justify-center' }" />
  </div>

  <!-- Tarifas -->
  <h3 :class="props.subtitles">Tarifas</h3>
  <!--- Tabla de Valores-->
  <TableRate>
    <tr v-for="rate in product.rates" class="border-t border-blue-900/40 text-blue-100 transition-colors text-center">
      <td class="px-4 py-3">{{ rate.price }}</td>
      <td class="px-4 py-3">{{ formatDate(rate.start_date) }}</td>
      <td class="px-4 py-3">{{ formatDate(rate.end_date) }}</td>
    </tr>

  </TableRate>

  <!-- Descripcion -->
  <h3 :class="props.subtitles">Descripcion</h3>
  <div class="w-full mb-3">
    <p :class="props.description">
      {{ product.description ?? 'Sin descripción' }}
    </p>
  </div>

  <!-- Eventos -->
  <div class="w-full flex flex-row gap-2 items-center justify-center">

    <!-- Editar -->
    <UButton label="Editar" color="warning" class="cursor-pointer flex-1 justify-center py-3 text-base font-semibold"
      :to="`/home/products/${product.id}`" />

    <!-- Borrar -->
    <UButton label="Eliminar" color="error" class="cursor-pointer flex-1 justify-center py-3 text-base font-semibold"
      @click="deleteProduct(product.id)" />

    <!-- Descargar en PDF -->
    <UButton label="PDF" leading-icon="lucide:download" color="error"
      class="cursor-pointer flex-1 justify-center py-3 text-base font-semibold" @click="downloadPDF" download />
  </div>



</template>