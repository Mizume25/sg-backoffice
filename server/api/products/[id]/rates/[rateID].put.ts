/** Endpoint para actualizar rate */
export default eventHandler(async (e) => {
    
    /** Obtenemos rateID */
    const id = getRouterParam(e, 'rateID');

    /** Comprobamos error */
    if (!id) throw createError({ statusCode: 404, message: 'No se ha encontrado el ID' });

    /** Leemso contenido */
    const body = await readBody<EditRate>(e);

    /** Incializamos cliente */
    const supabase = await initClient(e)

    /** Editamos Rate */
    await editRate(supabase, body, id);
})