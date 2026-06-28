<!-- layout de Formulario -->
<script setup lang="ts">
</script>

<template>
  <!-- Contenedor  -->
  <div class="h-full overflow-y-auto overflow-x-hidden">
    <div
      class="w-full min-h-full flex flex-col lg:flex-row-reverse lg:items-start lg:justify-center gap-6 lg:gap-10 sm:p-6"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>