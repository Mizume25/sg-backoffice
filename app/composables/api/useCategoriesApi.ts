/** Accedemos al endpoint */
export const useCategoriesApi = () => {
  return useAsyncData<CategoryRecord[]>('categories', () => 
    $fetch('/api/categories'),
    { default: () => [] }
  )
}
