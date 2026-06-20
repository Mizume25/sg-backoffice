/** Composable  para gestionar Endpoints  */
export const useProductsApi = () => {
  
  /** Get lista de productos */
  const list = () => useAsyncData<ProductRecord []>(
    'products',
    () => $fetch('/api/products'),
    { default: () => []}
  )

  /** Refrescar lista */
  const refreshList = () => refreshNuxtData('products')

  /** Get de producto individual */
  const get = (id: string) => useAsyncData<ProductRecord | null>(
    'product',
    () => $fetch<ProductRecord>(`/api/products/${id}`, {method: 'GET'}),
    { default: () => null}
  )

  const refreshGet = () => refreshNuxtData('product')
  
  return {
    list,
    get,
    refreshList,
    refreshGet
  }
   
}
