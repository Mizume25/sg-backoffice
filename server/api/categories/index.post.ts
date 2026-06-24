/** /api/categories/
 * Creare una categoria
 */
export default eventHandler(async (e) => {
    /** Leemos datos  */
    const body = await readBody(e);

    /** Incializamos cliente */
    const supabase = await initClient(e);

    /** Creamos categoria */
    createCategory(body, supabase);

    return { success: true }

})