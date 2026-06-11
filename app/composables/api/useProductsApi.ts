export const useProductsApi = () => {
  return useFetch(() => '/api/products');
}
