import type z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui'
/** Composable para edit  */
export const useCategory = (id: string) => {

  const toast = useToast();

  /** Categoria espcífica  */
  const { findCategory, getParent, getParents } = useCategoriesStore();
  const category: Ref<CategoryRecord | null> = ref(findCategory(id));


  /** Logica de Subcategorica  */
  const parent: Ref<CategoryRecord | undefined> = ref(getParent(category.value?.parent_id));
  const parents: Ref<CategoryRecord[] | null> = ref(getParents());
  /** SI es una subcategoria , tiene la opcion de 1 ver a su padre y poder cambiarlo e incluso eliminarlo */


  /** Esquema de Edit */
  const Schema: Ref<z.ZodType<EditCategory> | null> = ref(null);
  const FormState: Ref<EditCategory | null> = ref(null);



  /** Estructura de control */
  const allow = ref(false);


  /** Funcion añadir o eliminar padre */
  const toggleParent = () => {
    allow.value = !allow.value;
  }

  /** Estructura de Control */
  const loading = ref(false);

  /** Funcion para enviar formulario */
  const onSubmit = async (e: FormSubmitEvent<EditCategory>) => {

    loading.value = true;

    /** Construir objeto */
    const update: EditCategory = {
      name: e.data.name?.toLocaleLowerCase(),
      code: e.data.code,
      description: e.data.description,
      parent_id: allow.value ? undefined : e.data.parent_id
    }


    /** Peticiones al endpoint  */
    try {

      await $fetch(`/api/category/${category.value?.id}`, {
        method: 'PUT',
        body: update
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
    Schema,
    parent,
    parents,
    allow,
    toggleParent,
    loading,
    onSubmit,
    onDelete
    
  }
}
