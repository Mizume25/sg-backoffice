/** Endpoint para modificar relaciones de categorias */
export default eventHandler(async (e) => {
    const id = getRouterParam(e, 'id');
    if (!id) throw createError({ statusCode: 404, message: 'El id no existe' });

    const body = await readBody(e);

    const supabase = await initClient(e);

    await changeCategories(supabase, body, id);
})