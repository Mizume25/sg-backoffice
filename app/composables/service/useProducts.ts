/**
 * Composable para Products index
 * @returns 
 */
export const useProducts = () => {


  /** Todos los productos disponible */
  const { data: allproducts } = useProductsApi().products.list();


  /** Variable reactivas | Filtro & Orden Actual */
  const filter: Ref<string | undefined> = ref(undefined);
  const orderBy: Ref<string | undefined> = ref('Defecto')


  /** Listas reactivas | Tipos de Filtro & Tipos de Orden */
  const order = ['Defecto', 'Nombre A-Z'];

  /** Todas las categorias padre disponibles en base a los productos */
  const parents = computed(() => allCategoryParents(allproducts.value));


  /** Control de Listas  */
  const currentProducts = computed(() => {

    let list = [...(allproducts.value ?? [])]

    /** Filtrado */
    if (filter.value) list = list.filter(p => p.categories_products?.some(c => c.categories?.name === filter.value))

    /** Por Orden */
    if (orderBy.value === order[1]) list = list.sort((a, b) => a.name.localeCompare(b.name))


    return list
  })

  /** Id Seleccionado */
  const selectedId = ref<string>('');

  /** Record actualizado */
  const record = computed(() => currentProducts.value.find(p => p.id === selectedId.value))

  /** Boolean para abrir SideBarRight */
  const isOpen = ref<boolean>(false);


  /**
   * Recibir producto
   * @param product UUID
   */
  const reciveProduct = (product: string | undefined): void => {
    let record = currentProducts.value.find((p) => p.id === product);
    if (!record) return;
    selectedId.value = record?.id

  }


  /** Funcion que descarga un Excel */
  async function downloadExcel() {
    try {
      const response = await fetch('/api/products/xlsx', { method: 'GET' })
      /** Convertimso en blob */
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'export.xlsx'
      a.click()


      URL.revokeObjectURL(url)
    } catch (error) {
      console.log(error)
    }

  }



  return {
    filter,
    order,
    orderBy,
    parents,
    currentProducts,
    record,
    reciveProduct,
    isOpen,
    downloadExcel
  }
}
