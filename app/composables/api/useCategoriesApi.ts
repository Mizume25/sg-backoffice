/** Accedemos al endpoint */
export const useCategoriesApi = () => {
  return useLazyFetch<CategoryRecord[]>(() => '/api/categories', {
    default: () => []
  });
}
