<script setup lang="ts">
import { Schema } from '~~/shared/schemas/categories/create';


/** Titulo */
definePageMeta({
  title: "Gestion de Categorias"
})

const { allcategories, FromState, parent, onSubmit, loading } = useCategories();

/** Obtenemos lista de categorias padre */
const parents = computed(() => allcategories.value.filter((p) => p.parent_id === null).map((p) => p.name));

const items = reactive<string[]>(['Nueva Categoria Padre', ...parents.value]);
type Link = Pick<CategoryRecord , 'id' | 'name' | 'categories'>

const edits = computed(() => 
  allcategories.value.filter((p) => p.parent_id == null).map((p) => ({ id: p.id, name: p.name , categories: p.categories}))
)



/** Si cambia la categoria padre cambia su id */
watch(parent, (newVal) => {

  let id = allcategories.value.find((p) => p.name == newVal)?.id;

  FromState.parent_id = id;

})

watch(() => FromState.name, (newVal) => {

  FromState.code = newVal?.slice(0, 3).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
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
        <UForm :schema="Schema" :state="FromState" :validate-on="['input']" @submit="onSubmit">
          <!-- Input -->

          <UFormField label="Categoria" name="name">
            <UInput class="mb-3 w-70" leading-icon="lucide:tag" v-model="FromState.name" />
          </UFormField>


          <UFormField>

          </UFormField>

          <!-- Select -->
          <UFormField label="Categoria Padre" name="parent_id">
            <USelect class="mb-3 capitalize w-70" :items="items" leading-icon="lucide:tags" v-model="parent"
              default-value="Nueva Categoria Padre" />
          </UFormField>


          <!-- Select -->
          <UFormField label="Descripcion" name="description">
            <UTextarea class="mb-4 w-70" v-model="FromState.description" />
          </UFormField>

          <!-- Enviar -->
          <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Crear" type="submit"
            :loading="loading" />

        </UForm>



      </div>

    </div>

    <!-- Editar categoria  -->
    <div
      class="w-100 min-h-120  max-h-120 bg-blue-400 p-4 rounded-2xl border border-black shadow-2xl  overflow-auto flex flex-col justify-start  scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-800 rounded-2xl p-6 flex flex-col gap-4">
        <h2 class="text-blue-300 font-bold text-2xl mb-4">Editar Categoria</h2>

        <!-- Lista de Links -->
        <div
          class="w-full min-h-10 bg-white rounded-xl border border-black ps-8  flex flex-row items-center justify-between gap-3"   v-for="edit in edits" >
          <!-- Categoria Padre-->
          <NuxtLink
            class="text-black capitalize  text-sm font-bold cursor-pointer transition-transform duration-150 hover:scale-115 hover:bg-yellow-300 rounded-sm p-1"   :to="`/home/categories/${edit.id}`" >
            {{ edit.name }} </NuxtLink>
          <!-- Categoria HIja -->
          <div
            class="w-45 h-full bg-gray-500 rounded-tr-xl rounded-br-xl flex flex-col justify-center items-center gap-4 p-4">
            <NuxtLink v-for="category in edit.categories"
              class="text-white capitalize text-sm font-bold cursor-pointer transition-transform duration-150 hover:translate-x-1.5 hover:text-yellow-300" :to="`/home/categories/${category.id}`" >
              {{ category.name }} </NuxtLink>
          

          </div>
        </div>






      </div>

    </div>
  </div>
</template>
