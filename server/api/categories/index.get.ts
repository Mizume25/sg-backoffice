/**
 * Lista de Categorias
 * @returns {Category[]} Lista de productos
 */
export default eventHandler(async(event) => {

    const categories = getCategories(event);

    return categories;
})