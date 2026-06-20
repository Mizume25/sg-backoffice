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
const { inputRef, preview, triggerInput, onFileChange, onDrop, image } = useImageLogic();


/** Logica de Tarifas */
const { rate, rates, addRate, removeRate } = useRateLogic();

/** Logica de rates */
const isOpen = ref(false);

const hasChildren = computed(() => (subcategories.value?.length ?? 0) > 0)

watch(subcategories, (newSubcats) => {
    const list = newSubcats ?? []

    if (list.length === 0) {
        // categoría sin hijos: limpia la selección
        FormState.subcategory = ''
        return
    }

    // hay hijos: si la selección actual no es válida, selecciona el primero
    const stillValid = list.some((c) => c.id === FormState.subcategory)
    if (!stillValid) {
        FormState.subcategory = list[0]!.id
    }
}, { immediate: true })


/** Obtener codigo dinamico */
watch(code, (newCode) => {
    FormState.code = newCode ?? ''
}, { immediate: true })


/** Copiar rates actuales */
watch(rates, (newRates) => {
    FormState.rates = newRates
    FormState.rates.forEach((r) => {
        console.log(r)
    })
})








const onError = (err: FormErrorEvent) => console.log(err)


</script>

<template>
    <FormLayout>

        <FormCard title="Añadir Producto">


            <div
                class="w-full flex-1 overflow-y-auto overflow-x-hidden pr-2 flex flex-col items-start gap-6 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                <UForm :schema="Schema" :state="FormState" class="w-full flex flex-col gap-6" @submit="onSubmit"
                    @error="onError">

                    <!-- Nombre -->
                    <UFormField label="Nombre" name="name" class="mb-3">
                        <UInput v-model="FormState.name" leading-icon="lucide:pencil" class="w-full" />
                    </UFormField>

                    <!-- Categoria Padre -->
                    <UFormField label="Categoria" name="category" class="mb-3">
                        <USelect :items="parents" class="w-full" label-key="name" value-key="id"
                            v-model="FormState.category" />
                    </UFormField>

                    <!-- Subcategoria -->
                    <UFormField label="Subcategoria" name="subcategory" class="mb-3">
                        <USelect :items="subcategories" label-key="name" value-key="id" v-model="FormState.subcategory"
                            class="w-full" :disabled="!hasChildren" />
                        <span v-if="!hasChildren" class="text-sm text-red-500 font-bold">No tiene subcategorias
                            disponibles</span>

                    </UFormField>

                    <!-- Precio y fechas -->
                    <UFormField label="Precio" name="price">
                        <div class="flex flex-row items-center gap-3">
                            <UInput class="w-24" trailing-icon="lucide:euro" type="number" placeholder="0.00"
                                v-model="rate.price" />

                            <div class="flex flex-col gap-2">
                                <UInput class="w-36" type="date" v-model="rate.start_date" />
                                <UInput class="w-36" type="date" v-model="rate.end_date" />
                            </div>
                        </div>
                    </UFormField>

                    <!--Acciones -->
                    <div class="w-full flex flex-row justify-end items-center gap-2">

                        <UButton class="w-10 h-10 cursor-pointer flex flex-row items-center justify-center "
                            icon="lucide:upload" color="primary" @click="addRate" />

                        <UButton @click="isOpen = !isOpen"
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
        <UButton icon="lucide:x" color="error" class="w-10 lg:hidden flex flex-row justify-center items-center cursor-pointer" @click="isOpen = !isOpen"  />
            <div class="p-4 flex flex-col gap-3 ">
                <h2 class="text-blue-300 font-bold text-xl sm:text-2xl mb-2">Tarifas</h2>
                <ItemRate v-for="(r, i) in rates" :rate="r" :id="i" :key="i" @id="removeRate(i)" />
            </div>

        </SideBarRight>
    </FormLayout>
</template>



<style lang="scss" scoped></style>