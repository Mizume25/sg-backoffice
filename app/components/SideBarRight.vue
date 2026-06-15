<script setup lang="ts">

/** Haremos el Side bar opcional */
const props = defineProps<({
  isOpen: boolean
  break?: string
  content:string
})>()


</script>

<template>
  <aside :class="[
    'fixed right-0 top-18 min-h-screen bg-[#0f172a] p-3 pt-10 z-50',
    'transition-transform duration-300',
    props.break,
    props.content,
    props.isOpen ? ' translate-x-0' : ' translate-x-full'
  ]" 
  
  
  > 
  
    <slot />
  
  
  </aside>
</template>

<style scoped></style>
