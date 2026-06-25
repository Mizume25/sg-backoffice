import type { FormSubmitEvent } from '@nuxt/ui'
import { type UpdateCategorySchema } from '~~/shared/schemas/categories/edit';

/** Composable para edit  */
export const useCategoryEdit = (id: string) => {

  const toast = useToast();
  const { confirm } = useConfirm();

  /** Categoria espcífica  */
  const CategoryStore = useCategoriesStore();
  const { findCategory, getParent } = useCategoriesStore();
  const { parents } = storeToRefs(CategoryStore);
  const category: Ref<CategoryRecord | undefined> = ref(findCategory(id));


  /** Logica de Subcategorica  */
  const parent: Ref<CategoryRecord | undefined> = ref(getParent(category.value?.parent_id));


  /** Formulario de estado mediante la categoria  */
  const FormState = reactive<EditCategory>({
    name: category.value?.name,
    code: category.value?.code,
    description: category.value?.description,
    parent_id: category.value?.parent_id
  })



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

      useCategoriesApi().updateCategoy(category.value?.id, update);

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

      useCategoriesApi().deleteCategory(id);

      toast.add({ title: 'Categoria Eliminada Correctamente', color: 'success', icon: 'lucide:check' })

      navigateTo('/home/categories/create');

    } catch (error) {
      toast.add({ title: 'Ha habido un problema', color: 'error', icon: 'lucide:x' })
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
