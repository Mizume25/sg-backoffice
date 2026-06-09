<script setup lang="ts">

const route = useRoute();

</script>

<template>
  <!-- Layout para toda la estructura auth -->
  <div class="relative w-full h-screen flex flex-col justify-center items-center gap-y-4">

    <!-- Header de Formularios auth -->
    <header class="w-94 bg-[#5c5c5c] rounded-2xl flex items-center justify-center gap-2 p-3">
      <div class="w-15 h-15 rounded-lg flex justify-center items-center">
        <NuxtImg src="/icons/sg_shop_logo.png" />
      </div>
      <!-- Titulo dínamico -->
      <h1 class="text-2xl text-black font-bold">{{ route.meta.title }}</h1>
    </header>

    <!-- Formulario de la página hija -->
    <main class="w-94 bg-[#5c5c5c] rounded-2xl p-3">
      <NuxtPage />
    </main>

  </div>
</template>

<style scoped></style>
