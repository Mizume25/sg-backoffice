/** /api/products/
 * Endpoint para crear producto
 */
export default eventHandler(async (e) => {

    /** Obtenemos los datos */
    const body = await readBody(e);

    /** Incializamos cliente */
    const supabase = await initClient(e);

    /*** Creamos entidades */
    const obj = await createEntities(supabase, body);


    return obj
})