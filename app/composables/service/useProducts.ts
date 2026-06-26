

/**
 * Variables reactivas de products.index
 * @returns filter, order , orderBY , productID
 */
export const useProducts = () => {

  /** Obtenemos lista de productos */
  const ProductStore = useProductsStore();

  const { data: allproducts } = useProductsApi().products.list();


  /** Variable reactivas | Filtro & Orden Actual */
  const filter: Ref<string | undefined> = ref('Todos');
  const orderBy: Ref<string | undefined> = ref('Defecto')


  /** Listas reactivas | Tipos de Filtro & Tipos de Orden */
  const order =  ['Defecto', 'Nombre A-Z']
  const parents = computed(() => ProductStore.allCategoryParents(allproducts.value));
  const items = ['Todos', ...parents.value] // "Todos" como filtro de categoria


  /** Control de Listas  */
  const listOrders = computed(() => {
    const list = [...(allproducts.value ?? [])]

    switch (orderBy.value) {
      case order[1]:
        return list.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return list
    }
  })

  /** Objeto Reactivo Especifico  */
  const selectedId = ref<string>('')

  const record = computed(() => listOrders.value.find(p => p.id === selectedId.value))

  const isOpen = ref<boolean>(false);
  /** Funcion que modifica el record actual */
  const reciveProduct = (product: string | undefined): void => {

    let record = listOrders.value.find((p) => p.id === product);
    
    if(!record) return;

    selectedId.value = record?.id

  
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
    isOpen
  }
}
