<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  break?: string
  content: string
}>()
</script>

<template>
  
  <!-- Sidebar Dinamico  -->
  <aside :class="[
    'fixed right-0 top-18 bg-[#0f172a] p-5 z-50',
    'h-[calc(100vh-4.5rem)] overflow-y-auto',
    'transition-transform duration-300',
    props.break,
    props.content,
    props.isOpen ? ' translate-x-0' : ' translate-x-full'
  ]">
    <slot />
  </aside>
</template>

<style scoped></style>
