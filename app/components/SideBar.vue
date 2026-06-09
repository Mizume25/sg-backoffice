<script setup lang="ts">




</script>

<template>
  <aside class="w-[20%] min-h-screen bg-[#0f172a] fixed left-0 top-15 p-3">
  <NuxtLink
    v-for="item in SideBarItems"
    :key="item.label"
    :to="item.to"
    class="flex items-center gap-3 w-full px-4 py-3 rounded-lg mt-1 cursor-pointer transition-all duration-150 text-slate-400 hover:text-white hover:bg-slate-700"
    active-class="bg-blue-600 text-white font-semibold"
  >
    <UIcon :name="item.icon" class="text-xl" />
    {{ item.label }}
  </NuxtLink>
</aside>
</template>

<style scoped></style>
