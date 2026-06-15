/** Enpoint para actualizar una categoría */
export default eventHandler(async (event) => {
    try {
        /** Obtenemos el id  */
        const id = getRouterParam(event, 'id');

     
        const body = await readBody(event);

        
  

        editCategory(event, id, body);

     

        return true;

    } catch (error) {
        throw createError({ statusCode: 500, message: "No se ha podido crear la categoria" });
    }

})