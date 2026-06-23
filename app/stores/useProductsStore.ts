/** Store de Productos */
export const useProductsStore = defineStore('products', () => {

    /** Variable General */
    const allproducts = ref<ProductRecord[]>([]);

    /** Setear valor */
    const setProducts = (products: ProductRecord[]) => {
        allproducts.value = products;
    }

    /** Encontrar producto */
    const findProduct = (id : string) : ProductRecord | undefined => {
        return allproducts.value.find((p) => p.id == id);
    }

    


    /**
     * Devuelve todos las categorias padres de 1 array de records
     * @param records 
     * @returns string []
     */
    const allCategoryParents = (records: ProductRecord[]): string[] => {

        if (records == null) return [];

        const parents: string[] | undefined = [];

        /** Recoremos cada Producto */
        records.forEach((product) => {

            /** Reutilizamos funcion indivudual */
            const parent = getParent(product)

            /** En caso de existir  */
            if (parent) {
                if (!parents.includes(parent)) parents.push(parent)
            }

        });


        return parents;


    }


    return {
        allproducts,
        setProducts,
        allCategoryParents,
        findProduct
    }

})