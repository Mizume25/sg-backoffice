/** Endpoint para obtener listado de Categorias */
export const useCategoriesApi = () => {
  const { data, status, error } = useAsyncData<CategoryRecord[]>(
    'categories',
    () => $fetch('/api/categories'),
    { default: () => [] }
  )


  const refreshCategories = () => {

    return refreshNuxtData('categories')
  }


  return {
    data,
    status,
    error,
    refreshCategories,
  }

}



/**
 * 
 * 
 *
 * 
 * 
export const useCategoriesApi = () => {
  return useAsyncData<CategoryRecord[]>('categories', () => 
    $fetch('/api/categories'),
    { default: () => [] }
  )
}

 */
