/** /api/products/[id] 
 * Borrar producto 
*/
export default eventHandler(async (e) => {
    const id = getRouterParam(e, 'id');
    if(!id) throw createError({ statusCode: 404 , message:'No se ha encontrado el ID'});

    const supabase = await initClient(e);

    await deleteEntitis(supabase, id);

})