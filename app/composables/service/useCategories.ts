
import { type StoreCategorySchema } from '~~/shared/schemas/categories/create'
import type { FormSubmitEvent } from '@nuxt/ui'
/** Composable de lógica reactiva  */
export const useCategories = () => {

  const INIT_STATE = {
    name: '',
    code: '',
    description: '',
    parent_id: undefined,
  }

  /** Obtenemos lista de categorias  */
  const { allcategories }  = storeToRefs(useCategoriesStore());
  const { getParents , refreshCategories} = useCategoriesStore();

  
  /*** Obtenemos array de objetos padre */
  const parents = ref<CategoryRecord[]>(getParents() ?? []);  


  const toast = useToast();


  /** Construimos el objeto  */
  const FromState = reactive<Partial<StoreCategorySchema>>({...INIT_STATE});

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
      loading.value = false;
    }

   

    


  }


  const clean = () => {
  Object.assign(FromState, {...INIT_STATE})

  loading.value = false
}

  /** Estructura de control */
  let allow = ref(true);


  /** Funcion añadir o eliminar padre */
  const addParent = () => {
    allow.value = !allow.value;
  }



  /**  Valores retornados  */
  return {
    parents,
    FromState,
    onSubmit,
    loading,
    addParent,
    allow

  }

}
