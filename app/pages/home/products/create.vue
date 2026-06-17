<script setup lang="ts">
import { Schema } from '~~/shared/schemas/categories/create';

/** Titulo */
definePageMeta({
    title: "Añadir Productos"
})

/** Logica de fomrulario general */
const { parents, FromState } = useProductCreate();

/** Logica de Imagenes */
const { inputRef, preview, triggerInput, loadPreview, onFileChange, onDrop} = useImageCreate();

/** Logica de rates */


const isOpen = ref(false);




</script>

<template>
    <!-- Main -->
    <div
        class="w-full min-h-screen sm:p-6 flex flex-row-reverse  items-center lg:items-start justify-center gap-6 lg:gap-10">

        <!-- Container Crear Producto -->
        <div class="w-full max-w-md sm:max-w-sm lg:w-100 bg-blue-300 p-4 rounded-2xl border border-black shrink-0 ">

            <!-- Contenido -->
            <div class="w-full bg-blue-900 rounded-2xl p-4 sm:p-6 flex flex-col shadow-2xl items-center justify-start ">

                <h2 class="text-2xl text-blue-300 font-bold mb-3">Añadir Producto</h2>

                <!-- Fomrulario -->
                <div class="w-full min-h-full flex flex-col items-start justify-center gap-6">
                    <UForm :schema="Schema" :state="FromState">

                        <!-- Nombre -->
                        <UFormField label="Names" class="mb-3" v-model="FromState.name">
                            <UInput leading-icon="lucide:pencil" class="w-full" />
                        </UFormField>


                        <!-- Categoria Padre -->
                        <UFormField label="Categoria" class="mb-3" v-model="FromState.category">
                            <USelect class="w-full" />
                        </UFormField>


                        <!-- Categoria Hija -->
                        <UFormField label="Subcategoria" class="mb-3" v-model="FromState.subcategory">
                            <USelect class="w-full" />
                        </UFormField>




                        <!-- Categoria Hija -->
                        <UFormField label="Precio" class="mb-3">
                            <div class="flex flex-row items-center gap-3">

                                <!-- Precio -->
                                <UInput class="w-24" trailing-icon="lucide:euro" type="number" placeholder="0.00" />

                                <!-- Fechas -->
                                <div class="flex flex-col gap-2">
                                    <UInput class="w-36" trailing-icon="lucide:calendar" type="date" />
                                    <UInput class="w-36" trailing-icon="lucide:calendar" type="date" />
                                </div>

                            </div>


                        </UFormField>

                        <div class="w-full flex flex-row justify-between items-center gap-4">

                            <!-- Agregar Tarifas -->
                            <UButton class="w-10 h-10 cursor-pointer flex flex-row items-center justify-center mb-3"
                                icon="lucide:upload" color="primary" />

                            <!-- Ver Tarifas -->
                            <UButton @click="isOpen = !isOpen"
                                class="w-34 h-10 cursor-pointer flex flex-row items-center justify-center mb-3"
                                color="warning" label="Ver Tarifas" />

                        </div>

                        <!-- Descripcion -->
                        <UFormField label="Descripcion" class="mb-3" v-model="FromState.subcategory">
                            <UTextarea class="w-75" />
                        </UFormField>


                        <UFormField label="Imagen" class="mb-3">
                            <div class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-primary transition-colors"
                                @click="triggerInput" @dragover.prevent @drop.prevent="onDrop">
                                <!-- Preview -->
                                <img v-if="preview" :src="preview" class="h-full w-full object-cover rounded-lg" />

                                <!-- Placeholder -->
                                <div v-else class="flex flex-col items-center gap-2 text-gray-400">
                                    <UIcon name="lucide:image-plus" class="text-4xl" />
                                    <span class="text-sm">Arrastra o haz click para subir</span>
                                    <span class="text-xs">PNG, JPG, WEBP — máx 5MB</span>
                                </div>
                            </div>

                            <!-- Input oculto -->
                            <input ref="inputRef" type="file" accept="image/png, image/jpeg, image/webp" class="hidden"
                                @change="onFileChange" />
                        </UFormField>

                    </UForm>

                </div>

            </div>
        </div>







    </div>

    <!--- Tarifas   -->
    <SideBarRight :is-open="isOpen" content="w-[25%] sm:w-[25%] h-full overflow-y-auto">

        <div class="p-4 flex flex-col gap-3 ">
            <h2 class="text-blue-300 font-bold text-xl sm:text-2xl mb-2">Tarifas</h2>


            <div class="w-full bg-white rounded-xl border border-black flex flex-col">

                <div class="flex flex-row items-stretch overflow-hidden">

                    <div
                        class="flex-1 sm:w-40 bg-gray-500 rounded-tl-xl rounded-bl-xl  flex flex-col  gap-2 p-3 shrink-0">
                        <p
                            class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer  w-full text-start flex items-center justify-center gap-2">
                            Fecha : 20/20/20
                            <UIcon name="lucide:move-right" class="text-xl mx-1" /> 20/20/20
                        </p>

                        <p
                            class="text-white capitalize text-xs sm:text-sm font-bold cursor-pointer  w-full text-start flex items-center justify-center gap-2">
                            Precio : 3.99
                        </p>



                    </div>
                    <div
                        class=" text-black capitalize text-xs sm:text-sm font-bold cursor-pointer  p-3 flex items-center min-w-0 truncate justify-center">
                        <UButton icon="lucide:trash" color="error" class="w-8 h-8 cursor-pointer" />
                    </div>

                </div>
            </div>




        </div>

    </SideBarRight>




</template>



<style lang="scss" scoped></style>