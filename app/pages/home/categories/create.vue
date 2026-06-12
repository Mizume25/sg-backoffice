<script setup lang="ts">
import { Schema } from '~~/shared/schemas/categories/create';


/** Titulo */
definePageMeta({
  title: "Gestion de Categorias"
})

const { allcategories, FromState, parent } = useCategories();

/** Obtenemos lista de categorias padre */
const parents = computed(() => allcategories.value.filter((p) => p.parent_id === null).map((p) => p.name));
const items = reactive<string[]>(['Nueva Categoria Padre', ...parents.value]);


watch(parent, (newVal) => {

  let id = allcategories.value.find((p) => p.name == newVal)?.id;

  FromState.parent_id = id;

})

</script>


<template>

  <!-- Main -->
  <div class="w-full h-full p-4 flex flex-row items-center justify-center gap-10">

    <!-- Container Crear Categoria -->
    <div class="w-100 h-110 bg-blue-300 p-4 rounded-2xl border border-black ">

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-900 rounded-2xl p-6 flex flex-col shadow-2xl items-center justify-center">
        <h2 class="text-blue-200 font-bold text-2xl mb-4 mt-10">Crear Categorias</h2>
        <UForm :schema="Schema" :state="FromState" :validate-on="['input']">
          <!-- Input -->

          <UFormField label="Categoria" name="name" >
            <UInput class="mb-3 w-70" leading-icon="lucide:tag" v-model="FromState.name"  />
          </UFormField>
          <!-- Select -->

     

          <UFormField label="Categoria Padre" name="parent_id">
            <USelect class="mb-3 capitalize w-70" :items="items"  leading-icon="lucide:tags" v-model="parent"  default-value="Nueva Categoria Padre" />
          </UFormField>



          <UFormField label="Descripcion" name="description">
            <UTextarea class="mb-4 w-70" v-model="FromState.description"  />
          </UFormField>

          <!-- Enviar -->
          <UButton class="w-20 h-10 flex items-center justify-center" label="Crear" />

        </UForm>



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
