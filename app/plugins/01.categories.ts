export default defineNuxtPlugin(nuxtApp => {

    /** Obtenemos Categorias */
    const categories = storeToRefs(useCategoriesStore());
})
