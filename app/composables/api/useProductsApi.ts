import type { StoreOrderSchema } from "~~/shared/schemas/orders/create"
import type { UpdateOrderSchema } from "~~/shared/schemas/orders/edit"
import type { StoreProductSchema, StoreRateSchema } from "~~/shared/schemas/products/create"
import type { EditRateSchema, UpdateProductSchema } from "~~/shared/schemas/products/edit"

/**
 * Composable que maneja lógica de peticiones de Products
 * @returns products , rates , images , orders
 */
export const useProductsApi = () => {
  /**
   * Claves de caché para useAsyncData/useNuxtData.
   */
  const KEY = {
    /** Lista de productos */
    list: 'products',

    /** Objeto PRoducto */
    obj: (id: string): string => `product-${id}`,
  }



  /**
   * Objeto que maneja las Funciones CRUD de Product
   */
  const products = {

    /**
     * Devuelve Lista de productos
     * @returns ProductRecord[]
     */
    list: () => useAsyncData<ProductRecord[]>(KEY.list, () => $fetch<ProductRecord[]>('/api/products', { method: 'GET' }), { default: () => [] }),

    /**
     * Devuelve una Producto Especifico
     * @param id UUID Product
     * @returns ProductRecord
     */
    get: (id: string) => useAsyncData<ProductRecord | null>(KEY.obj(id), () => $fetch<ProductRecord>(`/api/products/${id}`, { method: 'GET' }), { default: () => null }),

    /** Refresca Datos de la lista */
    useList: () => useNuxtData<ProductRecord[]>(KEY.list),

    /**
     * Refresca Datos del objeto
     * @param id UUID Product
     * @returns ProductRecord
     */
    useOne: (id: string) => useNuxtData<ProductRecord | null>(KEY.obj(id)),


    /**
     * Objeto que crea un producto
     * @param data StoreProductSchema
     * @returns ProductRecord
     */
    post: async (data: StoreProductSchema) => {
      const obj = await $fetch<ProductRecord>('/api/products', { method: 'POST', body: data });
      await refreshNuxtData(KEY.list);
      return obj;
    },

    /**
     * Actualizar Producto
     * @param id UUID Product
     * @param data UpdateProductSchema
     */
    put: async (id:string, data: UpdateProductSchema) => {
      await $fetch<void>(`/api/products/${id}`, { method: 'PUT', body: data })
      await refreshNuxtData(KEY.list);
      await refreshNuxtData(KEY.obj(id));
    },

    /** Eliminar Producto
     * @param id UUID Product
    */
    delete: async (id: string) => {
      await $fetch<void>(`/api/products/${id}`, { method: 'DELETE' })
      await refreshNuxtData(KEY.list);
    },

    /**
     * Actualizar Categorias Asociadas
     * @param product_id UUID Product
     * @param categories CategoryIDS
     */
    putCategories: async (product_id: string, categories: CategoryIDS) => {
      await $fetch<void>(`/api/products/${product_id}/categories`, { method: 'PUT', body: categories })
      await refreshNuxtData(KEY.list);
      await refreshNuxtData(KEY.obj(product_id));
  }}


  /** 
   * Entidades Asociadas a Productos
   */


  /**
   * Objeto que maneja las Funciones CRUD de Rate
   */
  const rates = {

    /**
     * Crear un Rate
     * @param product_id UUID Product
     * @param data StoreRateSchema
     */
    post: async (product_id: string, data: StoreRateSchema) => {
      await $fetch(`/api/products/${product_id}/rates/`, { method: 'POST', body: data })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    },

    /**
     * Actualizar Rate
     * @param product_id UUID Prdouct
     * @param id UUID Rate
     * @param data EdiRateSchema
     */
    put: async (product_id: string, id: string | undefined, data: EditRateSchema) => {

      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'PUT', body: data })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])


    },

    /**
     * Borrar Rate
     * @param product_id UUID Product
     * @param id UUID Rate
     */
    delete: async (product_id: string, id: string) => {
      await $fetch(`/api/products/${product_id}/rates/${id}`, { method: 'DELETE' })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    }

  }

  /**
   * Objeto que maneja las Funciones CRUD de Prodcut Images
   */
  const images = {

    /**
     * Crear Imagen de Producto
     * @param product_id UUID Product
     * @param data  UUID Image
     */
    post: async (product_id : string , data:FormData) => {
      await $fetch(`/api/products/${product_id}/images/`, { method: 'POST', body: data })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    },

    /**
     * Eliminar Imagen de Producto
     * @param product_id UUID Product
     * @param id UUID IMage
     */
    delete: async (product_id: string, id: string) => {
      await $fetch(`/api/products/${product_id}/images/${id}`, { method: 'DELETE' })
      await Promise.all([
        refreshNuxtData(KEY.list),
        refreshNuxtData(KEY.obj(product_id)),
      ])
    },

  }
  

  /**
   * Objeto de funcionesde CRUD Orders
   */
  const orders = {
    /**
     * Lista de Orders
     * @returns OrderRecord
     */
    list: () => useAsyncData<OrderRecord[]>('orders', () => $fetch<OrderRecord[]>(`/api/orders`, { method: 'GET' }), { default: () => [] }),
    /**
     * Cache de la lista
     * @returns OrderRecord
     */
    useList: () => useNuxtData<OrderRecord[]>('orders'),
    /**
     * Cache de Order
     * @param order StoreOrderSchema
     * 
     */
    post: async (order: StoreOrderSchema) => {
      await $fetch(`/api/orders`, { method: 'POST', body: order })
      await refreshNuxtData('orders');
    },
    
    /**
     * Actualizar order 
     * @param id UUID order
     * @param order UpdateOrderSchema
     */
    put: async (id: string, order: UpdateOrderSchema) => {
      await $fetch(`/api/orders/${id}`, { method: 'PUT', body: order })
      await refreshNuxtData('orders');
    },

    /**
     * Borrar Order
     * @param id UUID Order
     */
    delete: async (id: string) => {
      await $fetch(`/api/orders/${id}`, { method: 'DELETE' })
      await refreshNuxtData('orders');
    },
  }

  return { products, rates, images, orders }

}
