import type { StoreProductSchema } from "~~/shared/schemas/products/create"

/** Composable  para gestionar Endpoints  */
export const useProductsApi = () => {
  
  /** Get lista de productos */
  const listProducts = () => useAsyncData<ProductRecord []>(
    'products',
    () => $fetch('/api/products', { method: 'GET'}),
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


  /** Crear Producto */
  const postProduct = async(data: StoreProductSchema) => {
    try {

      const obj = await $fetch('/api/products', { method: 'POST', body:data});

      return obj;
      
    } catch (error) {
      
    }
  }

  const postImage = async(data: FormData , id:string) => {
      try {

        await $fetch(`/api/products/${id}/images/`, {method:'POST' , body:data})


        
      } catch (error) {
        
      }
  }
 

  return {
    listProducts,
    getProduct,
    refreshList,
    refreshGet,
    postProduct,
    postImage
  }
   
}
