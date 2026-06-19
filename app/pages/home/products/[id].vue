<script setup lang="ts">
/** Titulo */
definePageMeta({
  title: `Editar categoria`
})

/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;


</script>

<template>
  <div>
    Page: [id]
  </div>
</template>

<style scoped></style>
