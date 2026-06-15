<script setup>
const isOpen = ref(false)
</script>

<template>
  <!-- Botón hamburguesa — solo móvil -->
  <UButton class="lg:hidden fixed top-4 left-4 z-50" icon="lucide:menu" @click="isOpen = !isOpen" />



  <!-- Sidebar -->
  <aside :class="[
    'fixed left-0 top-18 min-h-screen bg-[#0f172a] p-3 pt-10 z-50',
    'transition-transform duration-300',
    'w-[75%] sm:w-[50%] lg:w-[20%]',
    'lg:translate-x-0',
    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  ]">

    <NuxtLink v-for="item in SideBarItems" :key="item.label" :to="item.to"
      class="flex items-center mb-5 w-full px-4 py-3 rounded-lg mt-1 cursor-pointer transition-all duration-150 text-slate-400 hover:text-white hover:bg-slate-700"
      active-class="bg-blue-600 text-white font-semibold" @click="isOpen = false">
      <UIcon :name="item.icon" class="text-xl me-2.5" />
      {{ item.label }}
    </NuxtLink>

  </aside>
</template>
