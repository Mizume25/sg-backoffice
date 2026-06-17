/** Composable de lógica reactiva  */
export const useCategories = () => {
 
  /** Obtenemos lista de categorias  */
  const store = useCategoriesStore()
  const { parents } = storeToRefs(store);

  /** Estructura de control */
  let allow = ref(true);


  /**  Valores retornados  */
  return {
    parents,
    allow

  }

}
