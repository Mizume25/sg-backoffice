/** /api/categories/:id GET 
 * Obtiene una categoria
*/
export default eventHandler(async (e) => {
    /** Obtenemos ID */
    const id = getRouterParam(e, 'id');

    /** Iniciamos cliente */
    const supabase = await initService(e);

    /** Obtenemos category */
    const category = await getCategory(supabase, id);

    /** Retornamos valor */
    return category;

    return { success: true, get: id }

})