import type { StoreProductSchema, StoreRateSchema } from "~~/shared/schemas/products/create"
import type { EditRateSchema, UpdateProductSchema } from "~~/shared/schemas/products/edit"
/** Composable  para gestionar Endpoints  */
export const useProductsApi = () => {

  /** KEYS de Productos */
  const PROD_KEY = {
    list: 'products',
    obj: (id: string): string => `product-${id}`,
  }


  const products = {

    /** GET */
    list: () => useAsyncData<ProductRecord[]>(PROD_KEY.list, () => $fetch('/api/products', { method: 'GET' }), { default: () => [] }),
    get: (id: string) => useAsyncData<ProductRecord | null>(PROD_KEY.obj(id), () => $fetch<ProductRecord>(`/api/products/${id}`, { method: 'GET' }), { default: () => null }),

    /** Refresh Data */
    useList: () => useNuxtData<ProductRecord[]>(PROD_KEY.list),
    useOne: (id: string) => useNuxtData<ProductRecord | null>(PROD_KEY.obj(id)),


    /** POST PUT DELETE */
    post: async (data: StoreProductSchema) => {
      const obj = await $fetch('/api/products', { method: 'POST', body: data });
      await refreshNuxtData(PROD_KEY.list);
      return obj;
    },

    /** Actualizar producto */
    put: async (data: UpdateProductSchema, id: string) => {
      await $fetch<Product>(`/api/products/${id}`, { method: 'PUT', body: data })
      await refreshNuxtData(PROD_KEY.list);
      await refreshNuxtData(PROD_KEY.obj(id));
    },

    /*** Borrar Producto */
    delete: async (id: string) => {
      await $fetch<unknown>(`/api/products/${id}`, { method: 'DELETE' } as any)
      await refreshNuxtData(PROD_KEY.list);
    }
  }


  ////////////////////////
  /*ENTIDADES ASOCIADAS*/
  ////////////////////////


  const rates = {
    post: async (product_id: string, data: StoreRateSchema) => {
      await $fetch(`/api/products/${product_id}/rates/`, { method: 'POST', body: data })
      await Promise.all([
        refreshNuxtData(PROD_KEY.list),
        refreshNuxtData(PROD_KEY.obj(product_id)),
      ])
    },


    put: async (product_id: string, id: string | undefined, data: EditRateSchema) => {

      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'PUT', body: data })
      await Promise.all([
        refreshNuxtData(PROD_KEY.list),
        refreshNuxtData(PROD_KEY.obj(product_id)),
      ])


    },

    delete: async (product_id: string, id: string) => {
      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'DELETE' })
      await Promise.all([
        refreshNuxtData(PROD_KEY.list),
        refreshNuxtData(PROD_KEY.obj(product_id)),
      ])
    }

  }

  const images = {
    post: async (data: FormData, product_id: string) => {
      await $fetch(`/api/products/${product_id}/images/`, { method: 'POST', body: data })
      await Promise.all([
        refreshNuxtData(PROD_KEY.list),
        refreshNuxtData(PROD_KEY.obj(product_id)),
      ])
    },
    delete: async (product_id: string, id: string) => {
      await $fetch(`/api/products/${product_id}/images/${id}`, { method: 'DELETE' })
       await Promise.all([
        refreshNuxtData(PROD_KEY.list),
        refreshNuxtData(PROD_KEY.obj(product_id)),
      ])
    },

  }









  return {
    products,
    rates,
    images,
  }

}
