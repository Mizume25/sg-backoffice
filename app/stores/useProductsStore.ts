/** Store de Productos */
export const useProductsStore = defineStore('products', () => {

    /** Variable General */
    const allproducts = ref<ProductRecord[]>([]);

    /** Setear valor */
    const setProducts = (products: ProductRecord[]) => {
        allproducts.value = products;
    }


    return {
        allproducts,
        setProducts
    }

})