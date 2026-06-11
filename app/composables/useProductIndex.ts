/**
 * Variables reactivas de products.index
 * @returns filter, order , orderBY , productID
 */
export const useProductIndex = () => {

  /** Variable de Filtro */
  const filter: Ref<string | undefined> = ref('Todos');

  /** Variable de id de producto */
  const productID : Ref<string | undefined> = ref('')

  /** Tipo de Orden */
  const orderBy : Ref<string | undefined > = ref('Defecto')

  /** orden actual */
  const order = computed(() => ['Defecto','Nombre A-Z'])

  return {
    filter,
    order,
    orderBy,
    productID
  }
}
