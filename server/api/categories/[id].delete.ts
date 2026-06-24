// DELETE /products/:id/rates/:rateId
// Elimina un categoria  
export default eventHandler(async (e) => {
    /* Obtenemos id */
    const id = getRouterParam(e, 'id');
    if(!id) throw createError({ statusCode: 404 , message:'No se ha encontrado el ID'});

    /** Incializamos cliente  */
    const supabase = await initClient(e);

    /** Borramos categorias */
    await deleteCategories(supabase, id)


    return { success: true, delete: id }
})