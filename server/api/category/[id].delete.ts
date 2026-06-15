/** Endpoint para eliminar una categoria */
export default eventHandler (async(event) => {

    /* Obtenemos Parametro */
     const id = getRouterParam(event , 'id');

     const category = await getCategory(event , 'id');


     



     
})