<script setup lang="ts">
/** Props de Componente */
const props = defineProps<({
  rate: Rate
})>()
</script>

<template>
  <!--- Template -->
  <div class="h-10 w-full bg-blue-200 rounded-sm border border-black flex flex-row justify-center items-center">

    <!-- Fechas -->
    <div class="bg-yellow-500 w-[50%] h-full flex flex-col justify-center items-center">
      <p class="text-black font-semibold text-sm">Inicio: {{ formatDate(rate.start_date) }}</p>
      <p class="text-black font-semibold text-sm">Fin: {{ formatDate(rate.end_date) }}</p>
    </div>

    <!-- Precios -->
    <div class="w-[50%] h-full flex flex-col items-center justify-center">
      <p class="text-black text-md font-semibold">{{ rate.price }} €</p>
    </div>


  </div>
</template>

<style scoped></style>
