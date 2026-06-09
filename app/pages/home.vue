<script setup lang="ts">

</script>

<template>
  <div class="w-full h-screen bg-[#5e84d6] ">
    <!-- Menu Nav -->
    <NavBar />
    <div class="flex pt-15">
      <!-- Side Bar-->
      <SideBar />

      <main class="ml-70 w-full min-hss-screen p-6">
        <NuxtPage />
      </main>


    </div>

  </div>
</template>

<style scoped></style>
