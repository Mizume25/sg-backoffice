/** Plugin para arrancar con store de products */
export default defineNuxtPlugin(async() => {

     const store = useProductsStore()
    const { data } = await useProductsApi().products.list();
    store.setProducts(data.value ?? [])
})