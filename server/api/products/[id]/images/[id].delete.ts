/*** /api/products/[id]
 * Borrar imagen
 */
export default eventHandler(async (e) => {
    /** Obtenemos el id */
    const id = getRouterParam(e, 'id');

    /** Incializamos cliente */
    const supabase = await initClient(e);

    /** Borramos imagen */
    await deleteImage(supabase, id);

    /** Estado */
    return { success: true , image:id}

})