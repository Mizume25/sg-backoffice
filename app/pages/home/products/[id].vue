<script setup lang="ts">
import { ProductSchema } from '~~/shared/schemas/products/edit'
/** Titulo */
definePageMeta({
  title: `Editar producto`
})




/** uuids de categoria */
const route = useRoute()
const id = route.params.id as string;

const { FormProductState, product, isOpen, edit, showSection } = useProductEdit(id);

const { rates, deleteRate, rateStatus, RateSchema, RateState, changeRate, actionRate } = useRateEdit(id);


const { images, URL, triggerInput, onDrop, onFileChange , inputRef , removeImage } = useImageEdit(id);


const closeSection = () => {
  isOpen.value = false;
  edit.value = '';
  rateStatus.value = false;


}


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


        <div class="p-4 flex flex-row items-center justify-start mb-1 gap-3">
          <UButton class="w-30 h-10 cursor-pointer" color="warning" label="Actualizar" leading-icon="lucide:pen"
            :disabled="isOpen" />
          <UButton class="w-30 h-10 cursor-pointer" color="error" label="Borrar" leading-icon="lucide:trash"
            :disabled="isOpen" />
        </div>


        <div class="p-4 flex flex-col items-center justify-between mb-3 gap-3">
          <UButton label="Editar Tarfias" color="info"
            class=" h-10 w-full cursor-pointer flex flex-row items-center justify-center transition-transform duration-150 hover:scale-110 "
            @click="showSection('rates')" />
          <UButton label="Editar Imagenes" color="warning"
            class=" h-10 w-full cursor-pointer flex flex-row items-center justify-center transition-transform duration-150 hover:scale-110 "
            @click="showSection('images')" />
          <UButton label="Editar Categorias Asociadas" color="success"
            class=" h-10 w-full cursor-pointer flex flex-row items-center justify-center transition-transform duration-150 hover:scale-110 "
            @click="showSection('categories')" />
        </div>


      </UForm>


    </FormCard>

    <div v-else class="flex justify-center p-4">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-20 w-20 text-primary" size="lg" />
    </div>




    <SideBarRight :is-open="isOpen" content="w-[40%] max-md:w-[100%] h-full overflow-y-auto">
      <div class="mb-3">
        <UButton icon="lucide:x" @click="closeSection" color="error" class="cursor-pointer" />
      </div>


      <!-- Rates -->
      <div v-if="edit == 'rates'">
        <div class="p-3 flex flex-row items-center justify-start gap-6">
          <USwitch icon="lucide:pencil" color="warning" class="cursor-pointer" @change="rateStatus = !rateStatus"
            size="xl" />
          <h2 class="shrink-0 mb-1 text-start text-2xl font-bold text-blue-200">{{ rateStatus ? 'Edit' : 'Create' }}
            Rates</h2>
        </div>

        <UForm :schema="RateSchema" :state="RateState" class="flex flex-row items-center gap-3 mb-4" v-if="RateState"
          @submit="actionRate">

          <UFormField>
            <UInput class=" w-24" trailing-icon="lucide:euro" type="number" placeholder="0.00"
              v-model="RateState.price" />
          </UFormField>


          <UFormField>
            <UInput class="w-36" type="date" v-model="RateState.start_date" />
          </UFormField>

          <UFormField>
            <UInput class="w-36" type="date" v-model="RateState.end_date" />
          </UFormField>



          <UButton :icon="rateStatus ? 'lucide:download' : 'lucide:upload'" class="cursor-pointer"
            :color="rateStatus ? 'warning' : 'primary'" type="submit" />

        </UForm>


        <!--- Tabla de Valores-->
        <TableRate>
          <tr v-for="rate in rates" class="border-t border-blue-900/40 text-blue-100 transition-colors text-center "
            :class="rateStatus ? 'cursor-pointer hover:bg-blue-800  duration-100 ease-in-out hover:scale-105' : ''"
            @click="changeRate(rate.id, rateStatus)">

            <td class="px-4 py-3">{{ rate.price }}</td>
            <td class="px-4 py-3">{{ formatDate(rate.start_date) }}</td>
            <td class="px-4 py-3">{{ formatDate(rate.end_date) }}</td>
            <td class="px-4 py-3">
              <UButton color="error" icon="lucide:x" class="cursor-pointer" size="sm" @click="deleteRate(rate.id)" />
            </td>
          </tr>

        </TableRate>



      </div>

      <!-- Images -->
      <div v-else-if="edit == 'images'">
        <h2 class="shrink-0 mb-4 text-start text-2xl font-bold text-blue-200">Edit Images </h2>

        <!-- Lista de Imagenes-->
        <ul class="flex flex-col gap-2">

          <!--- Itemos Iterados -->
          <li class="flex items-center gap-3 rounded-lg border border-gray-200 p-2 dark:border-gray-800"
            v-for="img in images">

            <a :href="URL + img.path" target="_blank" class="shrink-0">
              <NuxtImg :src="URL + img.path" class="h-14 w-14 rounded-md object-cover" />
            </a>

            <!-- Info en el centro -->
            <div class="min-w-0 flex-1">
              <a href="#" target="_blank" class="truncate text-sm hover:underline">
                {{ img.path }}
              </a>
            </div>

            <!-- Botones a la derecha -->
            <div class="flex shrink-0 items-center">
              <UButton icon="i-lucide-trash-2" color="error" size="sm" class="cursor-pointer" @click="removeImage(img.id)" />
            </div>
          </li>

          <UButton label="Añadir Imagen" class="flex flex-row items-center justify-center cursor-pointer"
            variant="ghost" size="xl" @click="triggerInput" @dragover.prevent @drop.prevent="onDrop" />
          <input ref="inputRef" type="file" accept="image/png, image/jpeg, image/webp" class="hidden"
            @change="onFileChange" />

        </ul>
      </div>

      <!-- Categorias -->
      <div v-else-if="edit == 'categories'">
        <h2 class="shrink-0 mb-4 text-start text-2xl font-bold text-blue-200">Edit Categories </h2>
      </div>

      <!-- vacio -->
      <div v-else-if="edit == ''" />

    </SideBarRight>


    <!-- Modal de confirmacion -->
    <ConfirmModal />


    <!--- Side lateral izquierdo -->
  </FormLayout>
</template>

<style scoped></style>
