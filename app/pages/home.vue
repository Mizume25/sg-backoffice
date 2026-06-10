<script setup lang="ts">

</script>

<template>
  <div class="w-full h-screen bg-[#5e84d6] overflow-hidden flex flex-col">
    <NavBar />
    <div class="flex flex-1 overflow-hidden pt-15">
      <SideBar />
      <main class="ml-70 flex-1 overflow-y-auto p-4">
       <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
