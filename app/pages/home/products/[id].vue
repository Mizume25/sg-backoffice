<script setup lang="ts">
import { ProductSchema } from '~~/shared/schemas/products/edit'
/** Titulo */
definePageMeta({
  title: `Editar producto`
})




/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

const { FormProductState, product } = useProductEdit(id);







</script>

<template>
  <!--- Layout -->
  <FormLayout>

    <!--- Formulario -->
    <FormCard :title="`Editar ${product?.name}`" v-if="FormProductState && product">
      <UForm :schema="ProductSchema" :state="FormProductState" class="w-full">
        <!--- Name --->
        <UFormField label="Name" name="name">
          <UInput class="w-full mb-3" v-model="FormProductState.name" />
        </UFormField>
        <!--- Code --->
        <UFormField label="Code" name="code">
          <UInput class="w-full mb-3" v-model="FormProductState.code" />
        </UFormField>

        <!-- Descripcion -->
        <UFormField label="Descripcion" name="description">
          <UTextarea class="w-full mb-3" v-model="FormProductState.description" />
        </UFormField>

        <div class="p-4 flex flex-row items-center justify-between">
          <UButton class="w-30 h-10 cursor-pointer" color="warning" label="Actualizar" leading-icon="lucide:pen" />
          <UButton class="w-30 h-10 cursor-pointer" color="error" label="Borrar" leading-icon="lucide:trash" />
        </div>



      </UForm>


    </FormCard>

    <div v-else class="flex justify-center p-4">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-20 w-20 text-primary" size="lg" />
    </div>




    <!--- Side lateral izquierdo -->
  </FormLayout>
</template>

<style scoped></style>
