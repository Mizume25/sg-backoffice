<script setup lang="ts">
import { ProductSchema } from '~~/shared/schemas/products/edit'
/** Titulo */
definePageMeta({
  title: `Editar producto`
})




/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

const { productRecord, FormProductState, status } = useProductEdit(id);







</script>

<template>
  <!--- Layout -->
  <FormLayout>

    <!--- Formulario -->
    <FormCard :title="`Editar ${productRecord?.name}`">
      <UForm :schema="ProductSchema" :state="FormProductState" class="w-full">
        <!--- Name --->
        <UFormField label="Name" name="name">
          <UInput class="w-full mb-3" />
        </UFormField>
        <!--- Code --->
        <UFormField label="Code" name="code">
          <UInput class="w-full mb-3" />
        </UFormField>

        <!-- Descripcion -->
        <UFormField label="Descripcion" name="description">
          <UTextarea class="w-full mb-3" />
        </UFormField>


        <UButton label="test" class="w-30" />
        <UButton label="tost" class="w-30" />
      </UForm>
    </FormCard>


    <!--- Side lateral izquierdo -->
  </FormLayout>
</template>

<style scoped></style>
