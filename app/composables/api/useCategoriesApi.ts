/** Accedemos al endpoint */
export const useCategoriesApi = () => {
  return useFetch<CategoryRecord[]>(() => '/api/categories', {
    default: () => []
  });
}
