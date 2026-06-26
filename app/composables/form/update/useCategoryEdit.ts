import type { FormSubmitEvent } from '@nuxt/ui'
import { type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';

/** Composable para edit  */
export const useCategoryEdit = (category_id: string) => {

  const toast = useToast();
  const { confirm } = useConfirm();
  


  /** Estructura de control */
  const allow = ref(false);



  /** Estructura de Control */
  const loading = ref(false);

  /** Funcion para enviar formulario */
  const onUpdate = async (e: FormSubmitEvent<EditCategory>) => {

    loading.value = true;

    const update: UpdateCategorySchema = {
      name: e.data.name,
      code: e.data.code,
      description: e.data.description,
      parent_id: e.data.parent_id === undefined ? null : e.data.parent_id
    }

    /** Peticiones al endpoint  */
    try {

      useCategoriesApi().categories.put(category_id, update);

      toast.add({ title: 'Categoria Editada Correctamente', color: 'success' })
      loading.value = false

    } catch (e) {
      toast.add({ title: 'Algo ha fallado', color: 'error' })
      loading.value = false;

    }
  }

  /** Funcion para eliminar categoria */
  const onDelete = async (id: string | undefined) => {
    const ok = await confirm({
      title: 'Borrar Categoria',
      description: `¿Deseas eliminar este tarifa? Esta acción no se puede deshacer.`
    });

    if (!ok) return


    try {

      await useCategoriesApi().categories.delete(id);

      toast.add({ title: 'Categoria Eliminada Correctamente', color: 'success', icon: 'lucide:check' })

      navigateTo('/home/categories/create');

    } catch (error) {
      toast.add({ title: 'Ha habido un problema', color: 'error', icon: 'lucide:x' })
    }


  }




  return {
    allow,
    loading,
    onUpdate,
    onDelete

  }
}
