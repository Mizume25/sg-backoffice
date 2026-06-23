/** Endpoint para crear Rate */
export default eventHandler(async (e) => {
    try {
        const body = await readBody(e);

        const supabase = await initClient(e);

        await createRates(supabase, [body]);


    } catch (error) {
        throw error
    }


})