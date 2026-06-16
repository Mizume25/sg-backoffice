

/** Endpoint para eliminar una categoria */
export default eventHandler(async (event) => {

    try {


        /* Obtenemos Parametro */
        const id = getRouterParam(event, 'id');

        const category = await getCategory(event, id);

        /** Borramos categorias */
        await deleteCategories(event , category)


    } catch (error) {
        throw createError({ statusCode:409 , message:'Ha habido un conflicto'});
    }
})