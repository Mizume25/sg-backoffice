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
const { category, FormState, Schema, parent, parents, allow, toggleParent, loading, onSubmit, onDelete } = useCategory(id);

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

/** Vigilamos el allow */
watch(allow, (newVal) => {

  FormState.value!.parent_id = newVal ? undefined : parents.value?.[0]?.id
  console.log(FormState.value?.parent_id);
}
)



const isOpen = ref(false);


</script>

<template>
  <!-- Main -->
  <div class="w-full h-full p-4 flex flex-row items-center justify-center gap-10">

    <!-- Container Crear Categoria -->
    <div class="w-100 h-145 bg-blue-300 p-4 rounded-2xl border border-black">

     

      <!-- Contendio -->
      <div class="w-full h-full bg-blue-900 rounded-2xl p-6 flex flex-col shadow-2xl items-center justify-center "
        v-if="Schema && FormState">

        <div class="w-full h-10 mt-10">
            <NuxtLink :to="category?.parent_id == null ? '/home/categories/create' : `/home/categories/${category.parent_id}` "
          class="flex items-center gap-2 text-blue-300 hover:text-blue-100 text-sm transition-colors duration-200 cursor-pointer group mb-4">
          <UIcon name="lucide:arrow-left" class="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Volver</span>
        </NuxtLink>
        </div>
       
        <h2 class="text-blue-200 font-bold text-xl mb-4  capitalize">Editar {{ category?.parent_id == null ?
          'Categoria' : 'Subcategoria' }} "{{ category?.name }}" </h2>
        <UForm :schema="Schema" :state="FormState" @submit="onSubmit">
          
          <!-- Nombre -->
          <UFormField label="Categoria" name="name">
            <UInput class="mb-3 w-70 capitalize"
              :leading-icon="category?.parent_id == null ? 'lucide:tag' : 'lucide:tags'" v-model="FormState.name" />
          </UFormField>

          <!-- Codigo -->
          <UFormField label="Codigo" name="code">
            <UInput class="mb-3 w-70 capitalize" leading-icon="lucide:barcode" v-model="FormState.code" disabled />
          </UFormField>

          <!--- Campo Dinamico -->

          <!-- Campos de categorias padre -->
          <UFormField v-if="!category?.parent_id" label="Subcategorias">

            <!-- Iteracion de todas las caegorias hijas que tiene -->
            <NuxtLink v-for="cat in category?.categories" :to="`/home/categories/${cat.id}`"
              class="flex items-center gap-2 text-blue-300 hover:text-blue-100 text-sm transition-colors duration-200 cursor-pointer group ">
              <UIcon name="lucide:tags"
                class="size-4 group-hover:translate-x-1 transition-transform duration-200 mb-2" />
              <span class="capitalize mb-2">{{ cat.name }}</span>
              <UIcon name="lucide:chevron-right" class="size-3 mb-2" />
            </NuxtLink>

          </UFormField>

          <!-- Campos de categoria padre -->
          <UFormField v-else-if="parents && parent && category?.parent_id" label="Categoria Padre" class="mb-2">
            <USelect :items="parents" label-key="name" value-key="id" v-model="FormState.parent_id!" class="w-70 mb-2"
              leading-icon="lucide:tag" :disabled="allow" />
            <UButton class="cursor-pointer" :label="allow ? 'Activar Padre' : 'Desactivar Padre'"
              :color="allow ? 'primary' : 'error'" @click="toggleParent" />
          </UFormField>



          <!-- Select -->
          <UFormField label="Descripcion" name="description" class="mt-4">
            <UTextarea class="mb-4 w-70" v-model="FormState.description" />
          </UFormField>

          <div class="p-4 flex flex-row gap-3">
            <!-- Enviar -->
            <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Editar" type="submit"
              color="warning" :loading="loading" />

            <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Eliminar" color="error"
              @click="isOpen = !isOpen" />
          </div>


        </UForm>



      </div>


      <UIcon name="lucide:loader" class="animate-spin text-blue-700 size-10" v-else />

      <!--Modal de confirmacion de eliminado-->
      <UModal v-model:open="isOpen">
        <template #title>
          <h2>Eliminar Categoria</h2>
        </template>
        <template #body>
          <p> ¿Estas seguro de querer eliminar la categoria <span class="italic">"{{ category?.name }}" ? </span></p>
          <p v-if="category?.parent_id == null" class="text-sm">Se eliminaran todas las categorias hijas </p>
          <div class="mt-2 w-full h-10 flex flex-row gap-4">
            <UButton class="w-30 h-8 cursor-pointer mt-5 flex items-center justify-center " label="Confirmar"
              @click="onDelete(category?.id); isOpen = false" />
            <UButton class="w-30 h-8 cursor-pointer mt-5 flex items-center justify-center " label="Cancelar"
              color="error" @click="isOpen = !isOpen" />
          </div>

        </template>
      </UModal>


    </div>
  </div>
</template>


<style lang="scss" scoped></style>