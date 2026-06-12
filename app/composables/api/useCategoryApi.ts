export const useCategoryApi = (id: string) => {
  return useAsyncData<CategoryRecord | null>('category', () =>
    $fetch(`/api/category/${id}`),
    { default: () => null }
  )
}