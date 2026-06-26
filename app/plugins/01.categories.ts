
/** Plugin para arrancar con store de categorias */
export default defineNuxtPlugin(async() => {
    
    const store = useCategoriesStore()
    const { data } = await useCategoriesApi().categories.list();
    store.setCategories(data.value ?? [])

    
})
