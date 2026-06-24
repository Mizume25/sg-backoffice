/** Endpoint para actualizar rate */
export default eventHandler(async (e) => {
    const id = getRouterParam(e, 'rateID');
    if (!id) throw createError({ statusCode: 404, message: 'No se ha encontrado el ID' });

    const body = await readBody<EditRate>(e);


    const supabase = await initClient(e)


    await editRate(supabase, body, id);
})