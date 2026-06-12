/** Endpoint para crear categorias  */
export default eventHandler(async (event) => {
    try {


        /** Leemos datos  */
        const body = await readBody(event);

        /** Creamos categoria */
        createCategory(body, event);

        return true;
        
    } catch (e) {
        throw createError({ statusCode: 500, message: "No se ha podido crear la categoria" });
    }


})