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
    const findCategory = (id: string): CategoryRecord | null => {

        if (!allcategories.value.length || !id) return null;

        return allcategories.value.find((p) => p.id == id) ?? null;

    }

    /** Obtener solo listado padre */
    const parents = computed(() => allcategories.value.filter((p) => p.parent_id === null));


    /** Obtener padre especifico a partir del id */
    const getParent = (id: string | null | undefined): CategoryRecord | undefined => {
        if (!id || !allcategories) return undefined;

        return allcategories.value.find((p) => p.id === id) ?? undefined;
    }


    return { allcategories, findCategory, parents, getParent, setCategories, refreshCategories };


})