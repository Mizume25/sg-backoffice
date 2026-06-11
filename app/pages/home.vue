<template>
  <!-- Tempalte Principal -->
  <div class="w-full h-screen bg-[#5e84d6] overflow-hidden flex flex-col">
    <!-- Top Bar -->
    <NavBar />

    <!-- Content -->
    <div class="flex flex-1 overflow-hidden pt-15">
      <!-- Barra lateral -->
      <SideBar />

       <!-- Contenido Principal -->
      <main class="ml-70 flex-1 overflow-hidden p-4">
       <NuxtPage />
      </main>
    </div>
  </div>
</template>
