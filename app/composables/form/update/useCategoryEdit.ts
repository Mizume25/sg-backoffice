import type { FormSubmitEvent } from '@nuxt/ui'
import { initState, type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';

/** Composable para edit  */
export const useCategoryEdit = (id: string) => {

  const toast = useToast();

  /** Categoria espcífica  */
  const store = useCategoriesStore();
  const { findCategory, getParent } = useCategoriesStore();
  const { parents } = storeToRefs(store);
  const category: Ref<CategoryRecord | null> = ref(findCategory(id));


  /** Logica de Subcategorica  */
  const parent: Ref<CategoryRecord | undefined> = ref(getParent(category.value?.parent_id));


  /** Formulario de estado mediante la categoria  */
  const FormState = ref(initState(category.value));



  /** Estructura de control */
  const allow = ref(false);



  /** Estructura de Control */
  const loading = ref(false);

  /** Funcion para enviar formulario */
  const onUpdate = async (e: FormSubmitEvent<EditCategory>) => {

    loading.value = true;

    const update : UpdateCategorySchema = {
      name: e.data.name,
      code:e.data.code,
      description:e.data.description,
      parent_id: e.data.parent_id === undefined ? null : e.data.parent_id
    }

    /** Peticiones al endpoint  */
    try {

      await $fetch(`/api/category/${category.value?.id}`, {
        method: 'PUT',
        body:update
      })

      toast.add({ title: 'Categoria Editada Correctamente', color: 'success' })
      loading.value = false



      

    } catch (e) {
      toast.add({ title: 'Algo ha fallado', color: 'error' })
      loading.value = false;

    }
  }

  /** Funcion para eliminar categoria */
  const onDelete = async(id:string | undefined) => {

    try {


      await $fetch(`/api/category/${id}`, {
        method:'DELETE'
      })

      toast.add({ title: 'Categoria Eliminada Correctamente', color: 'success' })

      navigateTo('/home/categories/create');
      
    } catch (error) {
      
       toast.add({ title: 'Hay productos asociados', color: 'error' })
    }

    
  }




  return {
    category,
    FormState,
    parent,
    parents,
    allow,
    loading,
    onUpdate,
    onDelete
    
  }
}
