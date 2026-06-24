// DELETE /products/:id/rates/:rateId
// Elimina un categoria  
export default eventHandler(async (e) => {
    /* Obtenemos id */
    const id = getRouterParam(e, 'id');

    /** Incializamos cliente  */
    const supabase = await initClient(e);

    /** Borramos categorias */
    await deleteCategories(supabase, id)


    return { success: true, delete: id }
})