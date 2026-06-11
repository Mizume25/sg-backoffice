/** Composable de lógica reactiva  */
export const useCategories = () => {

  /** Objetos Reactivos */

  /** Obtenemos lista de categorias  */
  const { data: allcategories } = useCategoriesApi();

  /** Obtenemos lsita de categorias padre */
  const parents = computed(() => allcategories.value.filter((p) => p.parent_id === null ).map((p) => p.name));

  /** Categoria Padre actual */
  const category = ref<string>('');

  const subcategory = ref<string | undefined>('');

  const categories = ref<Category[] | null>(null);



  /**  Valores retornados  */
  return {
  allcategories,
   parents,
   category,
   categories,
   subcategory
  }

}
