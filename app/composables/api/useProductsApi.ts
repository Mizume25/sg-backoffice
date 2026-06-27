import type { StoreOrderSchema } from "~~/shared/schemas/orders/create"
import type { UpdateOrderSchema } from "~~/shared/schemas/orders/edit"
import type { StoreProductSchema, StoreRateSchema } from "~~/shared/schemas/products/create"
import type { EditRateSchema, UpdateProductSchema } from "~~/shared/schemas/products/edit"

/**
 * Composable que maneja lógica de peticiones
 * @returns products , rates , images , orders
 */
export const useProductsApi = () => {

  /**
   * Clave para refrescar datos api
   */
  const KEY = {
    list: 'products',
    obj: (id: string): string => `product-${id}`,
  }



  /**
   * Objeto de funciones para CRUD de Productos
   */
  const products = {

    /**
     * Devuelve Lista de productos
     * @returns ProductRecord[]
     */
    list: () => useAsyncData<ProductRecord[]>(KEY.list, () => $fetch<ProductRecord[]>('/api/products', { method: 'GET' }), { default: () => [] }),

    /**
     * Devuelve una Producto Especifico
     * @param id uuid
     * @returns ProductRecord
     */
    get: (id: string) => useAsyncData<ProductRecord | null>(KEY.obj(id), () => $fetch<ProductRecord>(`/api/products/${id}`, { method: 'GET' }), { default: () => null }),

    /** Refresca Datos de la lista */
    useList: () => useNuxtData<ProductRecord[]>(KEY.list),

    /**
     * Refresca Datos del objeto
     * @param id uuid
     * @returns ProductRecord
     */
    useOne: (id: string) => useNuxtData<ProductRecord | null>(KEY.obj(id)),


    /**
     * Objeto que crea un producto
     * @param data StoreProductSchema
     * @returns Product
     */
    post: async (data: StoreProductSchema) => {
      const obj = await $fetch<ProductRecord>('/api/products', { method: 'POST', body: data });
      await refreshNuxtData(KEY.list);
      return obj;
    },

    /**
     * Actualizar Producto
     * @param data UpdateProductSchema
     * @param id uuid
     */
    put: async (data: UpdateProductSchema, id: string) => {
      await $fetch<void>(`/api/products/${id}`, { method: 'PUT', body: data })
      await refreshNuxtData(KEY.list);
      await refreshNuxtData(KEY.obj(id));
    },

    /** Eliminar Producto
     * @param id UUID
    */
    delete: async (id: string) => {
      await $fetch<void>(`/api/products/${id}`, { method: 'DELETE' })
      await refreshNuxtData(KEY.list);
    },

    /**
     * Actualizar Categorias Asociadas
     * @param product_id UUID
     * @param categories UUID
     */
    putCategories: async (product_id: string, categories: CategoryIDS) => {
      await $fetch<void>(`/api/products/${product_id}/categories`, { method: 'PUT', body: categories })
      await refreshNuxtData(KEY.list);
      await refreshNuxtData(KEY.obj(product_id));
    }
  }


  ////////////////////////
  /*ENTIDADES ASOCIADAS*/
  ////////////////////////


  /*** Rates  */
  const rates = {
    post: async (product_id: string, data: StoreRateSchema) => {
      await $fetch(`/api/products/${product_id}/rates/`, { method: 'POST', body: data })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    },


    put: async (product_id: string, id: string | undefined, data: EditRateSchema) => {

      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'PUT', body: data })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])


    },

    delete: async (product_id: string, id: string) => {
      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'DELETE' })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    }

  }

  /*** Imagenes */
  const images = {
    post: async (data: FormData, product_id: string) => {
      await $fetch(`/api/products/${product_id}/images/`, { method: 'POST', body: data })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    },
    delete: async (product_id: string, id: string) => {
      await $fetch(`/api/products/${product_id}/images/${id}`, { method: 'DELETE' })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    },

  }
  /** Orders */
  const orders = {
    list: () => useAsyncData<OrderRecord[]>('orders', () => $fetch<OrderRecord[]>(`/api/orders`, { method: 'GET' }), { default: () => [] }),
    useList: () => useNuxtData<OrderRecord[]>('orders'),
    post: async (order: StoreOrderSchema) => {
      await $fetch(`/api/orders`, { method: 'POST', body: order })
      await refreshNuxtData('orders');
    },
    put: async (id: string, order: UpdateOrderSchema) => {
      await $fetch(`/api/orders/${id}`, { method: 'PUT', body: order })
      await refreshNuxtData('orders');
    },
    delete: async (id: string) => {
      await $fetch(`/api/orders/${id}`, { method: 'DELETE' })
      await refreshNuxtData('orders');
    },
  }









  return {
    products,
    rates,
    images,
    orders
  }

}
