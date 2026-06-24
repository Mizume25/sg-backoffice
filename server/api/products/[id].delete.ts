/** /api/products/[id] 
 * Borrar producto 
*/
export default eventHandler(async (e) => {
    const id = getRouterParam(e, 'id');

    const supabase = await initClient(e);

    await deleteEntitis(supabase, id);

})