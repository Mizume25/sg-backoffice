<script setup lang="ts">

const store = useProfileStore()
const { profile } = storeToRefs(store)



</script>
<template>
  <div class=" bg-[#2e2e2e] rounded-2xl p-6">
    <h1 class="mb-3 font-bold text-md">Bienvenido de vuleta {{ profile?.name }}</h1>
    <UButton :ui="{
      base: 'flex flex-row items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95',
    }" class="w-full h-10 font-bold cursor-pointer"
     trailing-icon="lucide:arrow-big-right" 
     leading-icon="lucide:house"
     to="/home">
      Volver al Home
    </UButton>
  </div>
</template>

<style scoped></style>
