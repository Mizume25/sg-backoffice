/**
 * API para obtener la lista completa de productos
 * @returns {ProductRecord[]} Lista de productos
 */
export default eventHandler(async (e) => {

    const supabase = await initClient(e);

    /** Listado de Productos */
    const products: ProductRecord[] = await getProducts(supabase);

    return products;
});