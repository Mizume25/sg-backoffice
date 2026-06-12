
/**  Endpoint individual  */
export default eventHandler ((event) => {

    const id = getRouterParam(event , 'id');

    const category = getCategory(event , id);

    return category;

    
})