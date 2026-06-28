<script setup lang="ts">
import { Schema } from '~~/shared/schemas/categories/edit'

/** Titlo de la página */
definePageMeta({
  title: `Editar categoria`
})

/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

/** Lista de acategorias y categoria especifica */
const { data: category } = await useCategoriesApi().categories.get(id);
const { data: categories } = await useCategoriesApi().categories.list();


/** Logica General  */
const { allow, loading, onUpdate, onDelete } = useCategoryEdit(id);

/** Categorias padre generales y especifica */
const parents = computed(() => categories.value?.filter((p) => p.parent_id == null));
const parent: Ref<CategoryRecord | undefined> = ref(categories.value?.find((p) => p.id == category.value?.parent_id));


/** Estado de Formulario */
const FormState = reactive<EditCategory>({
  name: category.value?.name,
  code: category.value?.code,
  description: category.value?.description,
  parent_id: category.value?.parent_id
})



watch(allow, (newVal) => FormState.parent_id = newVal ? undefined : parents.value?.[0]?.id)







const back = category.value?.parent_id == null ? '/home/categories/create' : `/home/categories/${category.value.parent_id}`;

</script>

<template>
  <FormLayout>
    <FormCard :title="`Editar categoria ${category?.name}`" :back="back" v-if="FormState">
      <UForm :schema="Schema" :state="FormState" @submit="onUpdate"  class="w-full">

        <!-- Nombre -->
        <UFormField label="Categoria" name="name">
          <UInput class="mb-3 w-full capitalize"
            :leading-icon="category?.parent_id == null ? 'lucide:tag' : 'lucide:tags'" v-model="FormState.name" />
        </UFormField>

        <!-- Codigo -->
        <UFormField label="Codigo" name="code">
          <UInput class="mb-3 w-full capitalize" leading-icon="lucide:barcode" v-model="FormState.code" disabled />
        </UFormField>

        <!--- Campo Dinamico -->

        <!-- Campos de categorias padre -->
        <UFormField v-if="category?.parent_id == null" label="Subcategorias">

          <!-- Iteracion de todas las caegorias hijas que tiene -->
          <NuxtLink v-for="cat in category?.categories" :to="`/home/categories/${cat.id}`"
            class="flex items-center gap-2 text-blue-300 hover:text-blue-100 text-sm transition-colors duration-200 cursor-pointer group ">
            <UIcon name="lucide:tags" class="size-4 group-hover:translate-x-1 transition-transform duration-200 mb-2" />
            <span class="capitalize mb-2">{{ cat.name }}</span>
            <UIcon name="lucide:chevron-right" class="size-3 mb-2" />
          </NuxtLink>

        </UFormField>

        <!-- Campos de subcategorias -->
        <UFormField v-else-if="parents && parent" label="Categoria Padre" class="mb-2">
          <USelect :items="parents" label-key="name" value-key="id" v-model="FormState.parent_id!" class="w-full mb-2"
            leading-icon="lucide:tag" :disabled="allow" />
          <UButton class="cursor-pointer" :label="allow ? 'Activar Padre' : 'Desactivar Padre'"
            :color="allow ? 'primary' : 'error'" @click="allow = !allow" />
        </UFormField>



        <!-- Select -->
        <UFormField label="Descripcion" name="description" class="mt-4">
          <UTextarea class="mb-4 w-full" v-model="FormState.description" />
        </UFormField>

        <div class="p-4 flex flex-row gap-3">
          <!-- Enviar -->
          <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Actualizar" type="submit"
            color="warning" :loading="loading" />

          <UButton class="w-30 h-10 flex items-center justify-center cursor-pointer" label="Eliminar" color="error"
            @click="onDelete(category?.id)" />
        </div>


      </UForm>
    </FormCard>

    <div v-else class="flex justify-center p-4">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-20 w-20 text-primary" size="lg" />
    </div>


    <!--Modal de confirmacion de eliminado-->
    <ConfirmModal />



  </FormLayout>
</template>
