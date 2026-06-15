

/**
 * Variables reactivas de products.index
 * @returns filter, order , orderBY , productID
 */
export const useProducts = () => {

  /** Obtenemos lista de productos */
  const { data: products } = useProductsApi()

  /** Responsive */
    /** Responsive */
  const { width }  = useWindowSize();

  const isDesktop = computed(() => width.value > 768)  
  const isMobile = computed(() => width.value > 0 && width.value < 768)


  /** Variable reactivas | Filtro & Orden Actual */
  const filter: Ref<string | undefined> = ref('Todos');
  const orderBy: Ref<string | undefined> = ref('Defecto')


  /** Listas reactivas | Tipos de Filtro & Tipos de Orden */
  const order = computed(() => ['Defecto', 'Nombre A-Z'])
  const parents = computed(() => getAllParents(products.value ?? []));
  const items = ['Todos', ...parents.value] // "Todos" como filtro de categoria


  /** Control de Listas  */
  const listOrders = computed(() => {
    const list = [...(products.value ?? [])]

    switch (orderBy.value) {
      case order.value[1]:
        return list.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return list
    }
  })

  /** Objeto Reactivo Especifico  */
  const record: Ref<ProductRecord | undefined> = ref(undefined)

  const isOpen = ref<boolean>(false);
  /** Funcion que modifica el record actual */
  const reciveProduct = (product: string | undefined): void => {

    if (product == null) return

    record.value = listOrders.value.find((p) => p.id === product) ?? null;


    
  

  }



  return {
    filter,
    order,
    orderBy,
    parents,
    items,
    listOrders,
    record,
    reciveProduct,
    isMobile,
    isDesktop,
    isOpen
  }
}
