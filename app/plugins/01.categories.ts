
/** Plugin para arrancar con store de categorias */
export default defineNuxtPlugin(async() => {
    
    const store = useCategoriesStore()
    const { data } = await useCategoriesApi().listCategories()
    store.setCategories(data.value ?? [])

    
})
