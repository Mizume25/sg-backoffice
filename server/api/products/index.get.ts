/**
 * API para obtener la lista completa de productos
 * @returns {ProductRecord[]} Lista de productos
 */
export default eventHandler(async(event) => {

    const products : ProductRecord [] = await getProducts(event);

    return products;
});