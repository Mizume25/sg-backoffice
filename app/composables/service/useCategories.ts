
import { type StoreCategorySchema } from '~~/shared/schemas/categories/create'
/** Composable de lógica reactiva  */
export const useCategories = () => {


  /** Obtenemos lista de categorias  */
  const { data: allcategories } = useCategoriesApi();

  const parent = ref<string | undefined>(undefined);


  /** Construimos el objeto  */
  const FromState = reactive<Partial<StoreCategorySchema>>({
    name: undefined,
    code: undefined,
    description:undefined,
    parent_id: undefined,
  })


  /**  Valores retornados  */
  return {
    allcategories,
    parent,
    FromState
  }

}
