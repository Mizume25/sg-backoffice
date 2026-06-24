/** Enpoint para actualizar una categoría */
export default eventHandler(async (e) => {
    /** Obtenemos el id  */
    const id = getRouterParam(e, 'id');

    /** Obtenemos contenido */
    const body = await readBody(e);

    /** Inicializamos cliente */
    const supabase = await initClient(e);

    await editCategory(supabase, id, body);

    return { success: true, update: id }

})