/** Plugin para arrancar con store de products */
export default defineNuxtPlugin(() => {

    /** Creamos Store */
    const store = useProductsStore();

    /** Variable de productos */
    const products = useState<ProductRecord[]>('products', () => [])

    /*** obtenemos los productos */
    const { data: allproducts } = useProductsApi().listProducts();

    /** directamente damos el valor */
    if (!products.value.length) products.value = allproducts.value

    /** Seteamos */
    store.setProducts(products.value);
})