/** Store de Categorias */
export const useCategoriesStore = defineStore('categories', () => {

    /** Variable general */
    const allcategories = ref<CategoryRecord[]>([]);

    /** Setear Valores */
    const setCategories = (categories: CategoryRecord[]) => {
        allcategories.value = categories;
    }

    /** Refrescar datos */
    const refreshCategories = async () => {
        const data = await $fetch<CategoryRecord[]>('/api/categories')
        setCategories(data)
    }


    /** Funcion para obtener categoria */
    const findCategory = (id: string | undefined): CategoryRecord | undefined => {

        if (!allcategories.value.length || !id) return undefined;

        return allcategories.value.find((p) => p.id == id) ?? undefined;

    }

    /** Obtener solo listado padre */
    const parents = computed(() => allcategories.value
        .filter((p) => p.parent_id === null)
        .sort((a, b) => a.name.localeCompare(b.name)));




    /** Obtener padre especifico a partir del id */
    const getParent = (id: string | null | undefined): CategoryRecord | undefined => {
        if (!id || !allcategories) return undefined;

        return allcategories.value.find((p) => p.id === id) ?? undefined;
    }

    /** Obtener hijos a partir de un padre */


    return { allcategories, findCategory, parents, getParent, setCategories, refreshCategories };


})