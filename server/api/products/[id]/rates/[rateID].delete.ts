/** Endpoint par aeliminar una tarifa */
export default eventHandler(async (e) => {
    const id = getRouterParam(e, 'rateID');
    if (!id) throw createError({ statusCode: 404, message: 'No se ha encontrado el ID' });

    const supabase = await initService(e);

    await deleteRate(supabase, id);
})