<script setup lang="ts">
import { ProductSchema } from '~~/shared/schemas/products/edit'


/** Titulo */
definePageMeta({
  title: `Editar producto`
})

/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

const { productRecord  } = useProductEdit(id);



</script>

<template>
  <!--- Layout -->
  <FormLayout>

    <!--- Formulario -->
    <FormCard :title="`Editar Producto`">
      <UForm >

       



      </UForm>
    </FormCard>

    <!--- Side lateral izquierdo -->
  </FormLayout>
</template>

<style scoped></style>
