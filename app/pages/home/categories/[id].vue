<script setup lang="ts">
import { makeEditSchema } from '~~/shared/schemas/categories/edit';

/** Titulo */
definePageMeta({
  title: `Editar categoria`
})

/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

/** Composables */
const { category, FormState, Schema, parent, parents } = useCategory(id);

/** Cunado la página se monte */
watch(
  () => category.value,
  (newCategory) => {
    if (!newCategory) return;
    /** Obtenemos el esquema y estado correspondiente  */
    const { schema, state } = makeEditSchema(newCategory);
    Schema.value = schema;
    FormState.value = state;

  },
  { immediate: true }
);


const tester = () => {
  console.log("id cambiado a" , FormState.value?.parent_id);
}

</script>

<template>
  <!-- Main -->
  <div class="w-full h-full p-4 flex flex-row items-center justify-center gap-10">

    <!-- Container Crear Categoria -->
    <div class="w-100 h-130 bg-blue-300 p-4 rounded-2xl border border-black  flex items-center justify-center  ">

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-900 rounded-2xl p-6 flex flex-col shadow-2xl items-center justify-center "
        v-if="Schema && FormState">
        <h2 class="text-blue-200 font-bold text-xl mb-4 mt-10 capitalize">Editar {{ category?.parent_id == null ?
          'Categoria' : 'Subcategoria' }} "{{ category?.name }}" </h2>
        <UForm :schema="Schema" :state="FormState">

          <!-- Nombre -->
          <UFormField label="Categoria" name="name">
            <UInput class="mb-3 w-70 capitalize" leading-icon="lucide:tag" v-model="FormState.name" />
          </UFormField>

          <!-- Codigo -->
          <UFormField label="Codigo" name="name">
            <UInput class="mb-3 w-70 capitalize" leading-icon="lucide:tag" v-model="FormState.code" disabled />
          </UFormField>

          <!--- Campo Dinamico -->

          <!-- Campos de categorias padre -->
          <UFormField v-if="!category?.parent_id"  label="Subcategorias">

            <!-- Iteracion de todas las caegorias hijas que tiene -->
            <NuxtLink v-for="cat in category?.categories" :to="`/home/categories/${cat.id}`"
              class="flex items-center gap-2 text-blue-300 hover:text-blue-100 text-sm transition-colors duration-200 cursor-pointer group ">
              <UIcon name="lucide:tags" class="size-4 group-hover:translate-x-1 transition-transform duration-200 mb-2" />
              <span class="capitalize mb-2">{{ cat.name }}</span>
              <UIcon name="lucide:chevron-right" class="size-3 mb-2" />
            </NuxtLink>

          </UFormField>

          <!-- Campos de categorias hija -->
          <UFormField v-else-if="parents && parent && category?.parent_id" label="Categoria Padre">
            <USelect :items="parents" label-key="name" value-key="id" v-model="FormState.parent_id!" class="w-70" @change="tester" />
          </UFormField>



          <!-- Select -->
          <UFormField label="Descripcion" name="description" class="mt-4">
            <UTextarea class="mb-4 w-70" v-model="FormState.description" />
          </UFormField>

          <!-- Enviar -->
          <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Editar" type="submit" color="warning" />

        </UForm>



      </div>


      <UIcon name="lucide:loader" class="animate-spin text-blue-700 size-10" v-else />


    </div>
  </div>
</template>


<style lang="scss" scoped></style>