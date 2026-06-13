
import { type StoreCategorySchema } from '~~/shared/schemas/categories/create'
import type { FormSubmitEvent } from '@nuxt/ui'
/** Composable de lógica reactiva  */
export const useCategories = () => {


  /** Obtenemos lista de categorias  */
  const { allcategories }  = storeToRefs(useCategoriesStore())

  const parent = ref<string | undefined>(undefined);

  const toast = useToast()


  /** Construimos el objeto  */
  const FromState = reactive<Partial<StoreCategorySchema>>({
    name: undefined,
    code: undefined,
    description: undefined,
    parent_id: undefined,
  })

  const loading = ref(false)


  /** Obtenemos lso valores  */
  const onSubmit = async (e: FormSubmitEvent<StoreCategorySchema>) => {
    loading.value = true;

    /** Construir objeto */
    const category: CreateCategory = {
      name: e.data.name.toLocaleLowerCase(),
      code: e.data.code,
      description: e.data.description,
      parent_id: e.data.parent_id
    }

    /** Peticiones al endpoint  */

    try {
      await $fetch('/api/category', {
        method: 'POST',
        body: category
      })

      toast.add({ title: 'Categoria Creada Correctamente', color: 'success' })
  
      clean()
      
    } catch (e) {
      toast.add({ title: 'Algo ha fallado', color: 'error' })
    }

   




  }


  const clean = () => {
    Object.assign(FromState, {
      name: undefined,
      code: undefined,
      description: undefined,
      parent_id: undefined,
    })

    loading.value = false;
  }


  /**  Valores retornados  */
  return {
    allcategories,
    parent,
    FromState,
    onSubmit,
    loading
  }

}
