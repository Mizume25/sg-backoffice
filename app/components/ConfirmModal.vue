<!-- Componente de Modal Reutilizable -->
<script setup lang="ts">
const { onConfirm, options, handle } = useConfirm()
</script>

<template>
  <!-- Modal -->
  <UModal v-model:open="onConfirm" :title="options.title">
    <template #body>
      <p class="text-sm text-gray-300">{{ options.description }}</p>
    </template>

  <!-- Footer -->
    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton color="primary" :label="options.confirm" @click="handle(true)" class="cursor-pointer" />
        <UButton color="error" :label="options.cancel" @click="handle(false)"  class="cursor-pointer" />
      </div>
    </template>
  </UModal>
</template>
