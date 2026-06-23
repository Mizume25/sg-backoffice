

/** Endpoint para eliminar una categoria */
export default eventHandler(async (e) => {
    try {
        /* Obtenemos Parametro */
        const id = getRouterParam(e, 'id');

    
        /** Borramos categorias */
        await deleteCategories(e , id)


    } catch (error) {
        throw createError({ statusCode:409 , message:'Ha habido un conflicto'});
    }
})