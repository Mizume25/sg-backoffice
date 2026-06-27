/*** Endpoint de borrado de order */
export default eventHandler(async (e) => {

    const id = getRouterParam(e, 'id');
    if (!id) throw createError({ statusCode: 404, message: 'No se ha encontro la id' })
    const supabase = await initClient(e);

    await deleteOrder(supabase, id)
})