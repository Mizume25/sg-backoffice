import { type StoreProductSchema } from '~~/shared/schemas/products/create';
import type { FormSubmitEvent } from '@nuxt/ui'


/** Valores Estaticos
 * Estado inicial
 */
const initState = (): StoreProductSchema => ({
  name: '',
  code: '',
  description: '',
  category: '',
  subcategory: '',
  rates: [],
})


/** Composable donde se riga la logica de todo el creado de Product */
export const useProductCreate = () => {

  /** Composables Helpers -> LLamar a las funciones de limpieza */
  const { Rate } = useRateLogic()
  const { image, clearimage } = useImageLogic();
  const product = useProductsApi()
  const notify = useNotify()

  /** Button loading */
  const loading = ref(false);


  /** Variables Princpales : Categorias y Categorias Padres */
  const { data: allcategories } = useCategoriesApi().categories.list();
  const parents = computed(() => allcategories.value?.filter((p) => p.parent_id == null));


  /** Helper para obtener un codigo  */
  const makeCode = (name: string | undefined) => {
    if (!name) return null;
    return name?.slice(0, 2).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  }


  /** Estado Incial de Fomrulario */
  const FormState = reactive<StoreProductSchema>(initState());
  /** Padre actual */
  const parent = computed(() => parents.value?.find((p) => p.id === FormState.category))

  /** Subcategorias del padre actual */
  const subcategories = computed(() => parent.value?.categories);

  /** Codigo en base al nombre */
  const code = computed(() => makeCode(FormState.name));




  /** Borrar Formulario */
  const cleanForm = () => {
    Object.assign(FormState, initState())
    Rate.cleanAll();
    clearimage()
  }


  /**
   * Funcion que realiza peticion de llamada
   * @param file File
   * @param path path Image
   * @param product_id UUUID Product
   */
  const onImage = async (file: File, path: string, product_id: string) => {
    const fd = new FormData()
    fd.append('file', file, file.name)
    fd.append('path', path)
    await product.images.post(product_id, fd);
  }


  /**
   * Funcion parea crear Producto
   * @param e FormSubmitEvent StoreProductSchema
   */
  const onSubmit = async (e: FormSubmitEvent<StoreProductSchema>) => {
    loading.value = true

    try {
      const obj = await product.products.post(e.data)
      notify.success('Se ha añadido el producto correctamente')

      /** La imagen es opcional: si falla, el producto YA existe — avisamos sin revertir */
      if (image.value.file && image.value.path && obj) {
        try {
          await onImage(image.value.file, image.value.path, obj.id)
          notify.success('Imagen añadida correctamente')
        } catch {
          notify.warning('Producto creado, pero la imagen no se pudo subir')
        }
      }

      cleanForm()
    } catch {
      notify.error('No se pudo crear el producto');
    } finally {
      loading.value = false
    }
  }

  return {
    parents,
    FormState,
    subcategories,
    parent,
    loading,
    onSubmit,
    cleanForm,
    code
  }

}
