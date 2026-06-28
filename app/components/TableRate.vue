<script setup lang="ts">

const props = defineProps<{
  deletable?: boolean 
}>();

</script>

<template>
  <!-- Tabla de Rates-->
  <table class="w-full border-collapse overflow-hidden rounded-lg text-sm">
    <thead>
      <!-- Campos -->
      <tr class="bg-blue-950/60 text-blue-200 text-center">
        <th class="px-4 py-3 font-semibold">Precio</th>
        <th class="px-4 py-3 font-semibold">Inicio</th>
        <th class="px-4 py-3 font-semibold">Final</th>
        <th v-if="deletable" class="px-4 py-3 font-semibold"> <!-- Campo opcional -->
          <UIcon name="lucide:pencil" />
        </th>
      </tr>
    </thead>
    <tbody class="bg-blue-900">
      <slot />
    </tbody>
  </table>
</template>

<style scoped></style>
