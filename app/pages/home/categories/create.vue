<script setup lang="ts">
import { Schema } from '~~/shared/schemas/categories/create';
  import { type FormErrorEvent } from '@nuxt/ui'
/** Titulo */
definePageMeta({
  title: "Gestion de Categorias"
})


/** Funciones Fromulario */
const { FormState, loading, onSubmit, makeCode, allow } = useCategoryCreate();
/** Refrescado de variables */
const { data: categories } = await useCategoriesApi().categories.list();



const parents = computed(() => categories.value?.filter((p) => p.parent_id == null))

/** Si activa el padre empeiza el primera valor si no es nulo */
watch(allow, (newVal) => FormState.parent_id = newVal ? undefined : parents.value[0]?.id);



/** Si cambia el nombre, cambia el codigo */
watch(() => FormState.name, (newVal) => FormState.code = makeCode(newVal))




/** Toggle Sidebar de edits */
const isOpen = ref(false);


</script>


<template>
  <FormLayout>
    <FormCard :title="allow ? 'Crear Categoria' : 'Crear Subcategoria'">

      <!--- Formulario -->
      <UForm :schema="Schema" :state="FormState" :validate-on="['input']" @submit="onSubmit" class="w-full" >

        <!-- Nombre -->
        <UFormField label="Categoria" name="name">
          <UInput class="mb-4 w-full" :leading-icon="allow ? 'lucide:tag' : 'lucide:tags'" v-model="FormState.name" />
        </UFormField>

        <!-- Categoria Padre -->
        <UFormField label="Categoria Padre" name="parent_id" class="flex flex-col gap-1" v-if="parents">

          <USelect class="w-full mb-2" :leading-icon="allow ? '' : 'lucide:tag'" :items="parents" label-key="name"
            value-key="id" v-model="FormState.parent_id" :disabled="allow" />
          <UButton class="block mb-3 cursor-pointer" :label="allow ? 'Activar' : 'Desactivar'"
            :color="allow ? 'primary' : 'error'" @click="allow = !allow" />

        </UFormField>

        <!-- Descripcion -->
        <UFormField label="Descripcion" name="description">
          <UTextarea class="mb-4 w-full" v-model="FormState.description" />
        </UFormField>

        <div class="p-4 flex flex-row gap-4">
          <UButton class="w-full sm:w-30 h-10 flex items-center justify-center cursor-pointer" label="Crear"
            type="submit" :loading="loading" />
          <UButton class="w-40 sm:w-30 h-10 flex items-center justify-center cursor-pointer" label="Categorias"
            :color="isOpen ? 'warning' : 'error'" :leading-icon="isOpen ? 'lucide:eye' : 'lucide:eye-closed'"
            @click="isOpen = !isOpen" />

        </div>

      </UForm>

    </FormCard>
    <!-- Lista de categorias para editar -->
    <SideBarRight :is-open="isOpen" content="w-[30%] max-md:w-[100%] h-full overflow-y-auto">
      <UButton icon="lucide:x" color="error"
        class="w-10 lg:hidden flex flex-row justify-center items-center cursor-pointer" @click="isOpen = !isOpen" />
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




  </FormLayout>
</template>