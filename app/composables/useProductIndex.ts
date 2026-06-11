/**  Valores reactivos para products.index */
export const useProductIndex = () => {

  /** Variable de Filtro */
  const filter: Ref<string | undefined> = ref('Todos');


  const productID : Ref<string | undefined> = ref('')

  const orderBy : Ref<string | undefined > = ref('Defecto')

  const order = computed(() => ['Defecto','Nombre A-Z'])

  return {
    filter,
    order,
    orderBy,
    productID
  }
}
