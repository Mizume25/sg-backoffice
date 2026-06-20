/*** Serie de endpoints */
export const productsApi = {
    list: () => $fetch('api/products'),
    get:(id:string) => $fetch(`api/products/${id}`),
}