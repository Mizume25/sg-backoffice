
/**  Endpoint individual  */
export default eventHandler (async(event) => {
    try {
        
   
    const id = getRouterParam(event , 'id');

    
    const supabase = await initService(event);


    const category = getCategory(supabase , id);

    return category;

     } catch (error) {
             throw createError({ statusCode: 500, message: "No se ha podido crear la categoria" });
    }

    
})