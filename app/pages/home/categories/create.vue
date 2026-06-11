<script setup lang="ts">

/** Titulo */
definePageMeta({
  title: "Gestion de Categorias"
})

const { parents , category , categories, allcategories , subcategory} = useCategories()


/** Valor Incial */
category.value = parents.value[0]!;

/** Las subcategorias simepre son en realcion al padre */
categories.value = allcategories.value.find((p) => p.name === category.value)?.categories!;

const subcategories = computed(() => categories.value?.map((p) => p.name) ?? []);

subcategory.value = subcategories.value[0]!;




</script>


<template>

  <!-- Main -->
  <div class="w-full h-full p-4 flex flex-row items-center justify-center gap-10">

    <!-- Container Crear Categoria -->
    <div class="w-100 h-80 bg-blue-800 p-4 rounded-2xl border border-black ">

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-300 rounded-2xl p-4 flex flex-col shadow-2xl ">
        <h2 class="text-blue-900 font-bold text-2xl mb-4">Crear Categorias</h2>

            
        <!-- Container -->
        <h3 class="text-black font-bold"> Categoria Padre </h3>
        <USelect  class="mb-3" :items="parents" v-model="category" />
       
        <!-- Container -->
        <h3 class="text-black font-bold"> Subcategoria </h3>
         <USelect  class="mb-3" :items="subcategories" v-model="subcategory" />
       



      </div>

    </div>

    <!-- Editar categoria  -->
    <div class="w-100 h-120 bg-blue-300 p-4 rounded-2xl border border-black shadow-2xl">

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-800 rounded-2xl p-4 flex flex-col ">
        <h2 class="text-blue-300 font-bold text-2xl mb-4">Editar Categoria</h2>

      </div>

    </div>
  </div>
</template>
