/** Endpoint para crear un Producto */
export default eventHandler(async (e) => {
    const body = await readBody(e);
    try {

        await createEntities(e, body);

    } catch (error) {
        throw createError({ statusCode: 409 , message:'No se ha podido añadir el producto'});
    }




})