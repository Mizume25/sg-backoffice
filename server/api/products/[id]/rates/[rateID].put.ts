

/** Endpoint para actualizar rate */
export default eventHandler(async (e) => {

    try {
        const id = getRouterParam(e, 'rateID');

        const body = await readBody<EditRate>(e);


        const supabase = await initClient(e)


        await editRate(supabase, body, id);

    } catch (error) {
        throw error;
    }



})