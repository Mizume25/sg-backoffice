import { type UpdateProductSchema } from '~~/shared/schemas/products/edit';
import type { FormSubmitEvent } from '@nuxt/ui'
/*** Composable logica edit  */
export const useProductEdit = (product_id: string) => {

  /** Items  */
  const toast = useToast();

  /** Objetos Necesarios */

  const { data: product } = useProductsApi().products.useOne(product_id);


  /*** Estado de Fomrulario */
  const FormProductState = reactive<UpdateProductSchema>({
    name: product.value?.name,
    code: product.value?.code,
    description: product.value?.description
  });

  /*** Secciones */
  type Section = '' | 'rates' | 'images' | 'categories';


  /** Boolean para abrir sidebar */
  const isOpen = ref(false);

  /** Secciones abiertas */
  const edit = ref<Section>('');

  /** Mostrando seccion */
  const showSection = (section: Section) => {
    edit.value = section;
    isOpen.value = true
  }


  const categories = computed(() => product.value?.categories_products);


  const { data: allcategories } = useCategoriesApi().categories.list();
  const parents = computed(() => allcategories.value?.filter((p) => p.parent_id == null));

  // padre inicial del producto
  const ownParent = computed(() => categories.value?.find(p => p.categories?.parent_id == null));

  // ref editable para el select (este es el v-model)
  const selectedParentId = ref<string | undefined>(undefined);

  // subcategorías que el producto YA tiene (para preselección)
  const ownSubIds = computed(() =>
    categories.value
      ?.filter(p => p.categories?.parent_id != null)
      .map(p => p.categories?.id) ?? []
  );

  // subcategorías del padre seleccionado — reactivo
  const subcategories = computed(() =>
    allcategories.value?.filter(p => p.parent_id === selectedParentId.value)
  );

  // merged reactivo: depende del padre seleccionado
  const merged = ref<{ label: string; value: string; checked: boolean }[]>([]);

  // inicializa el padre cuando carga el producto
  watchEffect(() => {
    if (ownParent.value?.categories?.id != null) {
      selectedParentId.value = ownParent.value.categories.id;
    }
  });

  // recalcula los checkboxes cada vez que cambia el padre (y por tanto subcategories)
  watch(subcategories, (subs) => {
    if (!subs) return;
    merged.value = subs.map(sub => ({
      label: sub.name,
      value: sub.id,
      checked: ownSubIds.value.includes(sub.id)
    }));
  }, { immediate: true });



  const onCategories = async () => {
    if (!selectedParentId.value) {
      toast.add({ title: 'Selecciona una categoría padre', color: 'error' , icon:'lucide:x' })
      return
    }
    try {

      const categories: CategoryIDS = {
        parent: selectedParentId.value,  
        childs: merged.value.filter(m => m.checked).map(m => m.value),
      }

      useProductsApi().products.putCategories(product_id , categories);
      

      toast.add({ title: 'Se ha modificado las categorias relacionadas correctamente', color: 'primary' })

    } catch (error) {
      toast.add({ title: 'Ha habido un problema en modficiar las categorias del producto', color: 'error' })
    }
  }

  const onProduct = async (e: FormSubmitEvent<UpdateProductSchema>) => {
    try {

      await useProductsApi().products.put(e.data, product_id);

      toast.add({ title: 'Producto Modificado correctamente', icon: 'lucide:check' })


    } catch (error) {
      toast.add({ title: 'No se pudo modificar el producto', icon: 'lucide:x' })
    }
  }





  return { FormProductState, isOpen, edit, showSection, parents, selectedParentId, merged, onCategories, onProduct }
}
