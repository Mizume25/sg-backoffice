
/**  Endpoint individual  */
export default eventHandler ((event) => {
    try {
        
   
    const id = getRouterParam(event , 'id');

    const category = getCategory(event , id);

    return category;

     } catch (error) {
             throw createError({ statusCode: 500, message: "No se ha podido crear la categoria" });
    }

    
})