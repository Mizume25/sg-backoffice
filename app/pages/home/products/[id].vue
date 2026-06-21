<script setup lang="ts">
import { ProductSchema } from '~~/shared/schemas/products/edit'


/** Titulo */
definePageMeta({
  title: `Editar producto`
})

/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

const { productRecord, FormProductState, product } = useProductEdit(id);


watch(productRecord, (newProduct) => {
  FormProductState.name = newProduct?.name,
    FormProductState.code = newProduct?.code,
    FormProductState.description = newProduct?.description


}, { immediate: true , });



console.log(FormProductState.description)

</script>

<template>
  <!--- Layout -->
  <FormLayout>

    <!--- Formulario -->
    <FormCard :title="`Editar ${productRecord?.name}`">
      <UForm :schema="ProductSchema" :state="FormProductState" class="w-full">
        <!--- Name --->
        <UFormField label="Name" name="name">
          <UInput class="w-full mb-3" v-model="FormProductState.name" />
        </UFormField>
        <!--- Code --->
        <UFormField label="Code" name="code">
          <UInput class="w-full mb-3" v-model="FormProductState.code" />
        </UFormField>
        <UFormField label="Descripcion" name="description">
          <UTextarea class="w-full mb-3" v-model="FormProductState.description"
            :key="FormProductState.description ? 'loaded' : 'empty'" />
        </UFormField>

        <!-- línea de prueba temporal, justo debajo -->
        <p style="color: red">DEBUG: [{{ FormProductState.description }}]</p>
      </UForm>
    </FormCard>

    <!--- Side lateral izquierdo -->
  </FormLayout>
</template>

<style scoped></style>
