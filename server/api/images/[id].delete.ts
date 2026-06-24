/** Endpoint para borrar imagen */
export default eventHandler(async (e) => {
    try {
        const id = getRouterParam(e, 'id');

        const supabase = await initClient(e);

        

        await deleteImage(supabase, id);

    } catch (error) {
        console.log(error)
        throw error
    }

})