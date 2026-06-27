/*** Endpoint de orders */
export default eventHandler(async(e) => {
    
    const supabase = await initClient(e);

    const orders = await getOrders(supabase);

    return orders;
    
})