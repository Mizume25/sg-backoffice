import type z from 'zod';
import { makeEditSchema } from '~~/shared/schemas/categories/edit';
/** Composable para edit  */
export const useCategory = (id: string) => {

  /** Todas las categorias */
  const { allcategories }  = storeToRefs(useCategoriesStore());

  /** Categoria espcífica  */
  const { findCategory, getParent , getParents } = useCategoriesStore();
    const category : Ref<CategoryRecord | null> = ref(findCategory(id));

  /** Logica de Subcategorica  */
  const parent : Ref<CategoryRecord | undefined > = ref(getParent(category.value?.parent_id));
  const parents : Ref<CategoryRecord [] | null> = ref(getParents());
  /** SI es una subcategoria , tiene la opcion de 1 ver a su padre y poder cambiarlo e incluso eliminarlo */


  /** Esquema de Edit */
  const Schema : Ref<z.ZodType<EditCategory> | null> = ref(null);
  const FormState : Ref<EditCategory | null> = ref(null);
  

  return {
    category,
    FormState,
    Schema,
    parent,
    parents
  }
}
