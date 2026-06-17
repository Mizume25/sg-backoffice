<script setup lang="ts">
import type { StoreRateSchema } from '~~/shared/schemas/products/create';


/** Tarifas Iterables */
const props = defineProps<{
  rate: StoreRateSchema
  id: number
}>();


const emit = defineEmits<{
  id: [number]
}>()

const handleID = () => {
  emit('id', props.id)
}

function formatearFecha(fechaStr: string) {
  const fecha = new Date(fechaStr)
  const dia = fecha.getDate().toString().padStart(2, '0')
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')
  const anio = fecha.getFullYear().toString().slice(-2)
  return `${dia}/${mes}/${anio}`
}

</script>

<template>
  <div class="w-full bg-white rounded-xl border border-black flex flex-col">
    <div class="flex flex-row items-stretch overflow-hidden">

      <div class="flex-1 sm:w-40 bg-gray-500 rounded-tl-xl rounded-bl-xl  flex flex-col  gap-2 p-3 shrink-0">
        <p
          class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer  w-full text-start flex items-center justify-center gap-2">
          Fecha : {{ formatearFecha(rate.start_date) }}
          <UIcon name="lucide:move-right" class="text-xl mx-1" /> {{ formatearFecha(rate.start_date) }}
        </p>

        <p
          class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer  w-full text-start flex items-center justify-center gap-2">
          Precio : {{ rate.price }} €
        </p>



      </div>
      <div
        class=" text-black capitalize text-xs sm:text-sm font-bold cursor-pointer  p-3 flex items-center min-w-0 truncate justify-center">
        <UButton icon="lucide:trash" color="error" class="w-8 h-8 cursor-pointer" @click="handleID" />
      </div>

    </div>
  </div>
</template>

<style scoped></style>
