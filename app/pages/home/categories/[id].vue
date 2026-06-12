<script setup lang="ts">
import { useCategory } from '~/composables/service/useCategory';

/** Titulo */
definePageMeta({
  title: `Editar categoria`
})
const route = useRoute()

const id = route.params.id as string;









</script>

<template>
  <!-- Main -->
  <div class="w-full h-full p-4 flex flex-row items-center justify-center gap-10">

    <!-- Container Crear Categoria -->
    <div class="w-100 h-110 bg-blue-300 p-4 rounded-2xl border border-black ">

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-900 rounded-2xl p-6 flex flex-col shadow-2xl items-center justify-center">
        <h2 class="text-blue-200 font-bold text-2xl mb-4 mt-10">Editar Categoria "</h2>
        <UForm>
          <!-- Input -->

          <UFormField label="Categoria" name="name">
            <UInput class="mb-3 w-70" leading-icon="lucide:tag" />
          </UFormField>


          <UFormField>

          </UFormField>

          <!-- Select -->
          <UFormField label="Categoria Padre" name="parent_id">
            <USelect class="mb-3 capitalize w-70" leading-icon="lucide:tags" default-value="Nueva Categoria Padre" />
          </UFormField>


          <!-- Select -->
          <UFormField label="Descripcion" name="description">
            <UTextarea class="mb-4 w-70" />
          </UFormField>

          <!-- Enviar -->
          <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Crear" type="submit" />

        </UForm>



      </div>

    </div>
  </div>
</template>


<style lang="scss" scoped></style>