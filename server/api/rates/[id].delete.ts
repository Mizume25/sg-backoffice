/** Endpoint par aeliminar una tarifa */
export default eventHandler(async(e) => {
    try {

        const id = getRouterParam(e , 'id');
        
        const supabase = await initService(e);

        await deleteRate(supabase, id);

    } catch (e:any) {
         throw createError({ statusCode: 409, message: e.message })
    }
})