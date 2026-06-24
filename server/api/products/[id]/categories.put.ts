

/** Endpoint para modificar relaciones de categorias */
export default eventHandler(async (e) => {

    try {


        const id = getRouterParam(e, 'id');
        if (!id) throw createError({ statusCode: 404, message: 'El id no existe' });

        const body = await readBody(e);


        await changeCategories(e, body, id);

    } catch (error) {
        throw error;
    }


})