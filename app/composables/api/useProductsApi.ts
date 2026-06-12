export const useProductsApi = () => {
  return useLazyFetch(() => '/api/products');
}
