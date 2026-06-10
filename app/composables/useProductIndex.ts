/**  Valores reactivos para products.index */
export const useProductIndex = () => {

  /** Variable de Filtro */
  const filter: Ref<string | undefined> = ref('Todos');

  const orderBy : Ref<string | undefined > = ref('Defecto')

  const order = computed(() => ['Defecto','Nombre A-Z'])

  const reciveParent = (parent: string | undefined): void => {
    filter.value = parent
  }


  return {
    filter,
    order,
    orderBy,
    reciveParent
  }
}
