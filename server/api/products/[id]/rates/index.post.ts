/** Endpoint para crear Rate */
export default eventHandler(async (e) => {
    const body = await readBody(e);

    const supabase = await initClient(e);

    await createRates(supabase, [body]);
})