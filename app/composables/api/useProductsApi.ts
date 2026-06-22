/** Composable  para gestionar Endpoints  */
export const useProductsApi = () => {
  
  /** Get lista de productos */
  const listProducts = () => useAsyncData<ProductRecord []>(
    'products',
    () => $fetch('/api/products'),
    { default: () => []}
  )

  /** Refrescar lista */
  const refreshList = () => refreshNuxtData('products')

  /** Get de producto individual */
  const getProduct = (id: string) => useAsyncData<ProductRecord | null>(
    `product-${id}`,
    () => $fetch<ProductRecord>(`/api/products/${id}`, {method: 'GET'}),
    { default: () => null}
  )

  const refreshGet = (id:string) => refreshNuxtData(`product-${id}`)

 
  
  return {
    listProducts,
    getProduct,
    refreshList,
    refreshGet
  }
   
}
