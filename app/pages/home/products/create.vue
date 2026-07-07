<script setup lang="ts">
import { Schema } from '~~/shared/schemas/products/create'
import { type FormErrorEvent } from '@nuxt/ui'

/** Titulo */
definePageMeta({
    title: "Añadir Productos"
})



/** Logica de fomrulario general */
const { parents, FormState, subcategories, loading, onSubmit, code } = useProductCreate();

/** Logica de Imagenes */
const { inputRef, triggerInput, onFileChange, onDrop, image, clearimage } = useImageLogic();


/** Logica de Tarifas */
const { CreateRate, rates, Rate } = useRateLogic();

/** Abrir SideBarRight*/
const isOpen = ref(false);

/** Saber si tiene o no subcategorias hijas el padre actual */
const hasChildren = computed(() => (subcategories.value?.length ?? 0) > 0)

/** Subcategorias acorde al padre actual  */
watch(subcategories, (newSubcats) => {
    const list = newSubcats ?? []

    if (list.length === 0) {
        FormState.subcategory = ''
        return;
    }
    const stillValid = list.some((c) => c.id === FormState.subcategory)

    if (!stillValid) FormState.subcategory = list[0]!.id

}, { immediate: true })


/** Obtener codigo dinamico */
watch(code, (newCode) => FormState.code = newCode ?? '', { immediate: true })


/** Copiar rates actuales */
watch(rates, (newRates) => {
    FormState.rates = newRates
})



onUnmounted(() => clearimage());


</script>

<template>
    <!--- Main -->
    <FormLayout>
        <!-- Contenido -->
        <FormCard title="Añadir Producto">


            <div
                class="w-full flex-1 overflow-y-auto overflow-x-hidden pr-2 flex flex-col items-start gap-6 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                <!-- Formulario -->
                <UForm :schema="Schema" :state="FormState" class="w-full flex flex-col gap-6" @submit="onSubmit">

                    <!-- Nombre -->
                    <UFormField label="Nombre" name="name" class="mb-3">
                        <UInput v-model="FormState.name" leading-icon="lucide:pencil" class="w-full" />
                    </UFormField>

                    <!-- Categoria Padre -->
                    <UFormField label="Categoria" name="category" class="mb-3">
                        <USelectMenu :items="parents" class="w-full" label-key="name" value-key="id"
                            v-model="FormState.category" />
                    </UFormField>

                    <!-- Subcategoria -->
                    <UFormField label="Subcategoria" name="subcategory" class="mb-3">
                        <USelect :items="subcategories" label-key="name" value-key="id" v-model="FormState.subcategory"
                            class="w-full" :disabled="!hasChildren" />
                        <span v-if="!hasChildren" class="text-sm text-red-500 font-bold">No tiene subcategorias
                            disponibles</span>
                        
                    </UFormField>


                    <div class="flex flex-row items-center gap-3">
                        <!-- Precio y fechas -->
                        <UFormField label="Precio" name="price">
                            <UInputNumber class="w-24 flex flex-row items-center justify-center"
                                trailing-icon="lucide:euro" placeholder="0.00" v-model="CreateRate.price" />
                        </UFormField>

                        <div class="flex flex-col gap-2">
                        <!-- Fecha de Incio -->
                            <UFormField  label="Inicio" name="start_date">
                                <UInput class="w-36" type="date" v-model="CreateRate.start_date" />
                            </UFormField>

                         <!-- Fecha Final -->    
                            <UFormField  label="Final" name="end_date">
                                <UInput class="w-36" type="date" v-model="CreateRate.end_date" />
                            </UFormField>
                        </div>
                    </div>


                    <!--Acciones -->
                    <div class="w-full flex flex-row justify-end items-center gap-2">

                        <UButton class="w-10 h-10 cursor-pointer flex flex-row items-center justify-center "
                            icon="lucide:upload" color="primary" @click="Rate.add" />

                        <UButton @click="() => {isOpen = !isOpen}"
                            class="w-10 h-10 cursor-pointer flex flex-row items-center justify-center "
                            :color="isOpen ? 'warning' : 'error'"
                            :leading-icon="isOpen ? 'lucide:eye' : 'lucide:eye-closed'" />
                    </div>

                    <!-- Descripcion -->
                    <UFormField label="Descripcion" name="description">
                        <UTextarea v-model="FormState.description" class="w-full" />
                    </UFormField>

                    <!-- Imagen -->
                    <UFormField label="Imagen" name="image" class="mb-3">
                        <div class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-primary transition-colors"
                            @click="triggerInput" @dragover.prevent @drop.prevent="onDrop">

                            <!-- Estado: archivo cargado -->
                            <div v-if="image.file" class="flex flex-col items-center gap-2 text-green-500">
                                <UIcon name="lucide:check-circle" class="text-4xl" />
                                <span class="text-sm font-medium">{{ image.file.name }}</span>
                                <span class="text-xs text-gray-400">Click para cambiar</span>
                            </div>

                            <!-- Estado: vacío -->
                            <div v-else class="flex flex-col items-center gap-2 text-gray-400">
                                <UIcon name="lucide:image-plus" class="text-4xl" />
                                <span class="text-sm">Arrastra o haz click para subir</span>
                                <span class="text-xs">PNG, JPG, WEBP — máx 5MB</span>
                            </div>
                        </div>

                        <input ref="inputRef" type="file" accept="image/png, image/jpeg, image/webp" class="hidden"
                            @change="onFileChange" />
                    </UFormField>

                    <!-- Enviar -->
                    <UButton class="w-full h-10 flex flex-row justify-center items-center cursor-pointer" label="Añadir"
                        type="submit" :loading="loading" />

                </UForm>
            </div>
        </FormCard>


        <!--- Tarifas   -->
        <SideBarRight :is-open="isOpen" content="w-[25%] max-md:w-[100%] p-4">
            <UButton icon="lucide:x" color="error"
                class="w-10 lg:hidden flex flex-row justify-center items-center cursor-pointer"
                @click="() => {isOpen = !isOpen}" />
            <div class="p-4 flex flex-col gap-3 ">
                <h2 class="text-blue-300 font-bold text-xl sm:text-2xl mb-2">Tarifas</h2>
                <!--- Items  -->
                <TableRate deletable>
                    <tr v-for="(rate, index) in rates"
                        class="border-t border-blue-900/40 text-blue-100 transition-colors text-center">

                        <td class="px-4 py-3">{{ rate.price }}</td>
                        <td class="px-4 py-3">{{ formatDate(rate.start_date) }}</td>
                        <td class="px-4 py-3">{{ formatDate(rate.end_date) }}</td>
                        <td class="px-4 py-3">
                            <UButton color="error" icon="lucide:x" class="cursor-pointer" size="sm"
                                @click="() => {Rate.remove(index)}" />
                        </td>
                    </tr>
                </TableRate>

            </div>

        </SideBarRight>
    </FormLayout>
</template>



<style lang="scss" scoped></style>