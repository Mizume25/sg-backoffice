
import { type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';
/** COmposable apra gestion Endpoints */
export const useCategoriesApi = () => {


  /** Get lista de categorias */
  const listCategories = () => useAsyncData<CategoryRecord[]>(
    'categories',
    () => $fetch('/api/categories', {method:'GET'}),
    { default: () => [] }
  )

  /** Refrescar Categorias */
  const refreshCategories = () => refreshNuxtData('categories');


  /** Crear una categoria */
  const postCategory = async (data: CreateCategory) => {
    await $fetch('/api/categories', {
      method: 'POST',
      body: data
    })
  }

  /** Editar una categoria */
  const updateCategoy = async (id: string | undefined, update: UpdateCategorySchema) => {
    await $fetch(`/api/categories/${id}`, {
      method: 'PUT',
      body: update
    })
  }


  /** Editar una categoria */
  const deleteCategory = async (id: string | undefined) => {
    await $fetch(`/api/categories/${id}`, { method: 'DELETE'})
  }

  /** Eliminar */

  return {
    listCategories,
    refreshCategories,
    postCategory,
    updateCategoy,
    deleteCategory
  }


}
