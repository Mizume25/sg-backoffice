/** Store de Categorias */
export const useCategoriesStore = defineStore('categories', () => {

    /** Variable general */
    const { data:allcategories , refresh} = useCategoriesApi();


    const refreshCategories = async () => await refresh();

    /** Funcion para obtener categoria */
    const findCategory = (id : string) : CategoryRecord | null => {
        
        if (!allcategories.value.length || !id) return null;

        return allcategories.value.find((p) => p.id == id) ?? null;

    }

    /** Obtener solo listado padre */
    const getParents = () : CategoryRecord [] | [] => {
        
        if(!allcategories.value.length) return [];

        return allcategories.value.filter((p) => p.parent_id === null);
    }


    /** Obtener padre especifico a partir del id */
    const getParent = (id : string | null |undefined) : CategoryRecord | undefined =>  {
        if(!id || !allcategories ) return undefined;

        return allcategories.value.find((p) => p.id === id) ?? undefined;
    }


    return { allcategories, findCategory, getParents, getParent , refreshCategories };

    
})