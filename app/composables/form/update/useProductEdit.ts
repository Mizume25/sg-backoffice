import { type UpdateProductSchema } from '~~/shared/schemas/products/edit';
import type { FormSubmitEvent } from '@nuxt/ui'
/*** Composable logica edit  */
export const useProductEdit = (id: string) => {

  /** Items  */
  const toast = useToast();

  /** Objetos Necesarios */
  const ProductRecord = useProductsStore();
  const product = computed(() => ProductRecord.findProduct(id))


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
  
  const { allcategories, parents } = useCategoriesStore();

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
    allcategories.filter(p => p.parent_id === selectedParentId.value)
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
    merged.value = subs.map(sub => ({
      label: sub.name,
      value: sub.id,
      checked: ownSubIds.value.includes(sub.id)
    }));
  }, { immediate: true });



  const onCategories = async () => {

    try {

      await $fetch(`/api/products/${id}/categories`, {
        method: 'PUT', body: {
          parent: selectedParentId.value,
          childs: merged.value.filter(m => m.checked).map(m => m.value)
        }

      })


      toast.add({ title:'Se ha modificado las categorias relacionadas correctamente' , color:'primary'})

    } catch (error) {
       toast.add({ title:'Ha habido un problema en modficiar las categorias del producto' , color:'error'})
    } 
  }

  const onProduct = async(e:FormSubmitEvent<UpdateProductSchema>) => {
  try {

    await $fetch<unknown>(`/api/products/${id}`, { method: 'PUT' } as any)

    toast.add({ title:'Producto Modificado correctamente' , icon:'lucide:check'})
    
    
  } catch (error) {
     toast.add({ title:'No se pudo modificar el producto' , icon:'lucide:x'})
  }
}





  return { FormProductState, product, isOpen, edit, showSection, parents, selectedParentId, merged , onCategories , onProduct }
}
