<script setup lang="ts">
import type { StoreRateSchema } from '~~/shared/schemas/products/create';


/** Tarifas Iterables */
const props = defineProps<{
  rate: StoreRateSchema
  id: string
}>()

</script>

<template>
  <div class="flex flex-row items-stretch overflow-hidden">

    <div class="flex-1 sm:w-40 bg-gray-500 rounded-tl-xl rounded-bl-xl  flex flex-col  gap-2 p-3 shrink-0">
      <p
        class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer  w-full text-start flex items-center justify-center gap-2">
        Fecha : {{ rate.start_date }}
        <UIcon name="lucide:move-right" class="text-xl mx-1" /> {{ rate.end_date }}
      </p>

      <p
        class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer  w-full text-start flex items-center justify-center gap-2">
        Precio : {{ rate.price }}
      </p>



    </div>
    <div
      class=" text-black capitalize text-xs sm:text-sm font-bold cursor-pointer  p-3 flex items-center min-w-0 truncate justify-center">
      <UButton icon="lucide:trash" color="error" class="w-8 h-8 cursor-pointer" />
    </div>

  </div>
</template>

<style scoped></style>
