import { type UpdateProductSchema } from '~~/shared/schemas/products/edit';
import type { FormSubmitEvent } from '@nuxt/ui'

/*** Composable logica edit  */
export const useProductEdit = (product_id: string) => {


  const loading = ref(false);
  /** Objetos Necesarios */
  const { data: product } = useProductsApi().products.useOne(product_id);


  /*** Estado de Fomrulario */
  const FormProductState = reactive<UpdateProductSchema>({
    name: product.value?.name,
    code: product.value?.code,
    description: product.value?.description
  });

  /** Guard para el boton de actualizar producto */
  const original = ref({...FormProductState});
  const isDirty = computed(() =>JSON.stringify(FormProductState) !== JSON.stringify(original.value))

  /** Boolean para abrir sidebar */
  const isOpen = ref(false);
  const { confirm } = useConfirm();

  /** Secciones abiertas */
  const edit = ref<EditSection>('');

  /** Categorias Inciales */
  const categories = computed(() => product.value?.categories_products);

  const { data: allcategories } = useCategoriesApi().categories.list();
  const parents = computed(() => allcategories.value?.filter((p) => p.parent_id == null));

  /** Padre actual en relacion a lcategoria de producto */
  const ownParent = computed(() => categories.value?.find(p => p.categories?.parent_id == null));

  /** Selecion reactiva */
  const selectedParentId = ref<string | undefined>(undefined);

  /**
   * Subcategorias relativas al producto
   */
  const ownSubIds = computed(() =>
    categories.value
      ?.filter(p => p.categories?.parent_id != null)
      .map(p => p.categories?.id) ?? []
  );

  /**
   * Subcategorias del padre
   */
  const subcategories = computed(() =>
    allcategories.value?.filter(p => p.parent_id === selectedParentId.value)
  );

  /**
   * Fusion de valores reactivos
   */
  const merged = ref<{ label: string; value: string; checked: boolean }[]>([]);

  /**
   * Incializa el padre cunado carga producto
   */
  watchEffect(() => {
    if (ownParent.value?.categories?.id != null) {
      selectedParentId.value = ownParent.value.categories.id;
    }
  });

  /**
   * Recalculo de checbox a medida que cambia
   */
  watch(subcategories, (subs) => {
    if (!subs) return;
    merged.value = subs.map(sub => ({
      label: sub.name,
      value: sub.id,
      checked: ownSubIds.value.includes(sub.id)
    }));
  }, { immediate: true });


  /**
   * Modificar Categoria
   */
  const onCategories = async () => {
    if (!selectedParentId.value) {
      useNotify().error('Selecciona una categoría padre');
      return
    }

    const ok = await confirm({
      title: 'Actualizar Categoria',
      description: `¿Quiere modificar las categorias de ${product.value?.name}?`,
      confirm:'Modificar'
    })

    if (!ok) return


    try {

      const categories: CategoryIDS = {
        parent: selectedParentId.value,
        childs: merged.value.filter(m => m.checked).map(m => m.value),
      }

      useProductsApi().products.putCategories(product_id, categories);

      useNotify().success('Categorias asociadas modificadas correctamente');

    } catch (error) {
      useNotify().error('Ha habido un problema en modificar las categorias');
    }
  }

  const onProduct = async (e: FormSubmitEvent<UpdateProductSchema>) => {
    loading.value = true;
    try {
      await useProductsApi().products.put(product_id, e.data);
      useNotify().success('Producto modificado correctamente');
       loading.value = false;
    } catch (error) {
      useNotify().error('No se pudo modificar el producto');
    }
  }





  return { FormProductState, isOpen, edit, parents, selectedParentId, merged, onCategories, onProduct , isDirty , loading }
}
