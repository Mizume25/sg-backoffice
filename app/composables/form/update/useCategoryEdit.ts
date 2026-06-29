import type { FormSubmitEvent } from '@nuxt/ui'
import { type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';

/** Composable para edit  */
export const useCategoryEdit = (category_id: string) => {


  const { confirm } = useConfirm();
  


  /** Estructura de control */
  const allow = ref(false);



  /** Estructura de Control */
  const loading = ref(false);

  /** Funcion para enviar formulario */
  const onUpdate = async (e: FormSubmitEvent<EditCategory>) => {

    loading.value = true;

    const update: UpdateCategorySchema = {
      ...e.data,
      parent_id: e.data.parent_id === undefined ? null : e.data.parent_id
    }

    /** Peticiones al endpoint  */
    try {

      useCategoriesApi().categories.put(category_id, update);

      useNotify().success('Categoria Editada Correctamente');
      loading.value = false

    } catch (e) {
        useNotify().error('No se ha podido actualizar la categoria');
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

      useNotify().success('Categoria Eliminada Correctamente');

      navigateTo('/home/categories/create');

    } catch (error) {
        useNotify().error('No se pudo eliminar la categoria');
    }


  }




  return {
    allow,
    loading,
    onUpdate,
    onDelete

  }
}
