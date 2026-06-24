/** /api/categories/
 * Lista de Categoria
 * @returns categories 
 */
export default eventHandler(async (e) => {

    /** Incializalizar cliente */
    const supabase = await initClient(e);

    /** Obtengo categorias */
    const categories = getCategories(supabase);

    /** lista de categorias */
    return categories;
})