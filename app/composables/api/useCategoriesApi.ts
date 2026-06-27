
import { type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';

/**
 * Composable de gestion de endpoints
 * @returns categories
 */
export const useCategoriesApi = () => {
  /**
   * Objeto que alogmera funciones CRUD de categories
   */
  const categories = {
    /**
     * Lista de Categorias
     * @returns CategoryRecord[]
     */
    list: () => useAsyncData<CategoryRecord[]>('categories', () => $fetch<CategoryRecord[]>('/api/categories', { method: 'GET' }), { default: () => [] }),

    /**
     * Objeto de Categoria
     * @returns CategoryRecord
     */
    get: (id: string) => useAsyncData<CategoryRecord | null>(`category-${id}`, () => $fetch<CategoryRecord | null>(`/api/categories/${id}`, { method: 'GET' }), { default: () => null }),

    /**
     * Cache de lista de categorias
     * @returns CategoryRecord[]
     */
    useList: () => useNuxtData<CategoryRecord[]>('categories'),

    /**
     * Cache de objeto categorias
     * @returns CategoryRecord
     */
    useOne: (id: string) => useNuxtData<CategoryRecord | null>(`category-${id}`),

    /**
     * Crear Categoria
     * @param data CreateCategory
     */
    post: async (data: CreateCategory) => {
      await $fetch('/api/categories', { method: 'POST', body: data })
      await refreshNuxtData('categories');
    },

    /**
     * Editar Categoria
     * @param id UUID Category
     * @param update UpdateCategorySchema
     */
    put: async (id: string | undefined, update: UpdateCategorySchema) => {
      if (!id) throw createError({ statusCode: 400, message: 'ID requerido' })
      await $fetch(`/api/categories/${id}`, { method: 'PUT', body: update })

      await refreshNuxtData('categories')
      await refreshNuxtData(`category-${id}`)
    },

    /**
     * Borar Categoria
     * @param id UUID Category
     */
    delete: async (id: string | undefined) => {
      if (!id) throw createError({ statusCode: 400, message: 'ID requerido' })
      await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
      await refreshNuxtData('categories');

    }


  }




  return {
    categories
  }


}
