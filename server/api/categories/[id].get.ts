/** /api/categories/:id GET 
 * Obtiene una categoria
*/
export default eventHandler(async (e) => {
    /** Obtenemos ID */
    const id = getRouterParam(e, 'id');
       if(!id) throw createError({ statusCode: 404 , message:'No se ha encontrado el ID'});

    /** Iniciamos cliente */
    const supabase = await initService(e);

    /** Obtenemos category */
    const category = await getCategory(supabase, id);

    /** Retornamos valor */
    return category;

    return { success: true, get: id }

})