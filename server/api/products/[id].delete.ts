/** Endpoint para poder eliminar productos */
export default eventHandler(async(e) => {
    const id = getRouterParam(e , 'id');

    await deleteEntitis(e , id);

})