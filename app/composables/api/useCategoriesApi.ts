
import { type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';
/** COmposable apra gestion Endpoints */
export const useCategoriesApi = () => {


  const categories = {

    list: () => useAsyncData<CategoryRecord[]>('categories', () => $fetch<CategoryRecord[]>('/api/categories', { method: 'GET' }), { default: () => [] }),
    get: (id: string) => useAsyncData<CategoryRecord | null>(`category-${id}`, () => $fetch<CategoryRecord | null>(`/api/categories/${id}`, { method: 'GET' }), { default: () => null }),

    useList: () => useNuxtData<CategoryRecord[]>('categories'),
    useOne: (id: string) => useNuxtData<CategoryRecord | null>(`category-${id}`),

    post: async (data: CreateCategory) => {
      await $fetch('/api/categories', { method: 'POST', body: data })
      await refreshNuxtData('categories');
    },

    put: async (id: string | undefined, update: UpdateCategorySchema) => {
      if (!id) throw createError({ statusCode: 400, message: 'ID requerido' })
      await $fetch(`/api/categories/${id}`, { method: 'PUT', body: update })

      await refreshNuxtData('categories')
      await refreshNuxtData(`category-${id}`)
    },

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
