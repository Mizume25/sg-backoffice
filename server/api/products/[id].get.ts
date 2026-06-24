/** Endpoint para obtener el objeto product */
export default eventHandler(async (e) => {
        const id = getRouterParam(e, 'id');
        const supabase = await initClient(e);

        const product = await getProduct(supabase, id);

        return product;
})