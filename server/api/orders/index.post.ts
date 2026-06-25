/** Endpoint para crear ordern */
export default eventHandler(async(e) => {

    const body = await readBody(e);


    const supabase = await initClient(e);


    await createOrder(supabase , body);


    return { succes: true }
})