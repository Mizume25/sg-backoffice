<script setup lang="ts">
import { Schema } from '~~/shared/schemas/categories/create';


/** Titulo */
definePageMeta({
  title: "Gestion de Categorias"
})

const { FromState, parents, onSubmit, loading, addParent, allow } = useCategories();


/** Estructura de control de datos */
watch(allow, (newVal) => {

  /** Si es verdadero carga el primer valor si es falso es undefined  */
  FromState.parent_id = newVal ? undefined : parents.value[0]?.id;

})

/** Obtener codigo */
watch(() => FromState.name, (newVal) => {
  FromState.code = newVal?.slice(0, 3).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
})




const isOpen = ref(false);

const tester = () => {
  isOpen.value = !isOpen.value
  console.log(isOpen.value)
}


</script>


<template>
  <!-- Main -->
  <div
    class="w-full min-h-screen sm:p-6 flex flex-row lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-10">

    <!-- Container Crear Categoria -->
    <div class="w-full max-w-md lg:w-100 bg-blue-300 p-4 rounded-2xl border border-black shrink-0">

      <!-- Contenido -->
      <div class="w-full bg-blue-900 rounded-2xl p-4 sm:p-6 flex flex-col shadow-2xl items-center justify-center me-10">
        <h2 class="text-blue-200 font-bold text-xl sm:text-2xl mb-4 mt-4 sm:mt-10 text-center">
          Crear {{ allow ? 'Categoria Padre' : 'Subcategoria' }}
        </h2>

        <UForm :schema="Schema" :state="FromState" :validate-on="['input']" @submit="onSubmit" class="w-full">

          <UFormField label="Categoria" name="name">
            <UInput class="mb-4 w-full" :leading-icon="allow ? 'lucide:tag' : 'lucide:tags'" v-model="FromState.name" />
          </UFormField>

          <UFormField label="Categoria Padre" name="parent_id" class="flex flex-col gap-1" v-if="parents">
            <USelect class="w-full mb-2" :leading-icon="allow ? '' : 'lucide:tag'" :items="parents" label-key="name"
              value-key="id" v-model="FromState.parent_id" :disabled="allow" />
            <UButton class="block mb-3 cursor-pointer" :label="allow ? 'Activar' : 'Desactivar'"
              :color="allow ? 'primary' : 'error'" @click="addParent" />
          </UFormField>

          <UFormField label="Descripcion" name="description">
            <UTextarea class="mb-4 w-full" v-model="FromState.description" />
          </UFormField>

          <div class="p-4 flex flex-row gap-4">
            <UButton class="w-full sm:w-30 h-10 flex items-center justify-center cursor-pointer" label="Crear"
              type="submit" :loading="loading" />
            <UButton class="w-full sm:w-30 h-10 flex items-center justify-center cursor-pointer" label="Editar"
              color="warning" @click="tester" />

          </div>

        </UForm>
      </div>
    </div>

    <!--
    <div
      class="w-full max-w-md lg:w-100 bg-blue-400 p-4 rounded-2xl border border-black shadow-2xl flex flex-col justify-start scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full overflow-y-auto lg:max-h-full">


      <div class="w-full h-full bg-blue-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
        <h2 class="text-blue-300 font-bold text-xl sm:text-2xl mb-2 sm:mb-4">Editar Categoria</h2>

        <div
          class="w-full min-h-10 bg-white rounded-xl border border-black ps-4 sm:ps-8 flex flex-row items-center justify-between gap-2 sm:gap-3"
          v-for="edit in parents" :key="edit.id">
          <NuxtLink
            class="text-black capitalize text-xs sm:text-sm font-bold cursor-pointer transition-transform duration-150 hover:scale-115 hover:bg-yellow-300 rounded-sm p-1 min-w-0 truncate"
            :to="`/home/categories/${edit.id}`">
            {{ edit.name }}
          </NuxtLink>

          <div
            class="w-32 sm:w-45 h-full bg-gray-500 rounded-tr-xl rounded-br-xl flex flex-col justify-center items-center gap-2 sm:gap-4 p-2 sm:p-4 shrink-0">
            <NuxtLink v-for="category in edit.categories" :key="category.id"
              class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer transition-transform duration-150 hover:translate-x-1.5 hover:text-yellow-300 w-full text-center"
              :to="`/home/categories/${category.id}`">
              {{ category.name }}
            </NuxtLink>
          </div>
        </div>

      </div>


    </div>


      --->

    <SideBarRight :is-open="isOpen" content="w-[35%] sm:w-[30%] h-full overflow-y-auto">

      <div class="p-4 flex flex-col gap-3">
        <h2 class="text-blue-300 font-bold text-xl sm:text-2xl mb-2">Editar Categoria</h2>

        <div class="w-full bg-white rounded-xl border border-black flex flex-row items-stretch overflow-hidden"
          v-for="edit in parents" :key="edit.id">

          <NuxtLink
            class="flex-1 text-black capitalize text-xs sm:text-sm font-bold cursor-pointer transition-colors duration-150 hover:bg-yellow-300 p-3 flex items-center min-w-0 truncate"
            :to="`/home/categories/${edit.id}`">
            {{ edit.name }}
          </NuxtLink>

          <div
            class="w-32 sm:w-40 bg-gray-500 rounded-tr-xl rounded-br-xl flex flex-col justify-center items-center gap-2 p-3 shrink-0">
            <NuxtLink v-for="category in edit.categories" :key="category.id"
              class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer transition-transform duration-150 hover:translate-x-1 hover:text-yellow-300 w-full text-center"
              :to="`/home/categories/${category.id}`">
              {{ category.name }}
            </NuxtLink>
          </div>

        </div>
      </div>

    </SideBarRight>


  </div>


</template>