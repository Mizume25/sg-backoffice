import { type StoreProductSchema } from '~~/shared/schemas/products/create';
import type { FormSubmitEvent } from '@nuxt/ui'


export const useProductCreate = () => {

  /** Variables que necesitaremos */
  const store = useCategoriesStore();
  const { parents } = storeToRefs(store);


  /** Helper para obtener un codigo  */
  const makeCode = (name: string | undefined) => {
    if (!name) return null;

    return name?.slice(0, 2).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  }


  const { clearRates } = useRateLogic()
  const { image, clearimage } = useImageLogic();


  /** Decorado */
  const loading = ref(false);
  const toast = useToast()


  /*** Estado Inicial */
  const INIT_STATE = {
    name: '',
    code: '',
    description: '',
    category: parents?.value?.[0]?.id ?? '',
    subcategory: parents?.value?.[0]?.categories[0]?.id ?? '',
    rates: [],
  }

  /** Estado reactivo */
  const FormState = reactive<StoreProductSchema>({ ...INIT_STATE });

  const parent = computed(() => store.findCategory(FormState.category))

  const subcategories = computed(() => parent.value?.categories);

  const subcategory = computed(() => parent.value?.categories[0])


  const code = computed(() => makeCode(FormState.name));





  const cleanForm = () => {
    Object.assign(FormState, { ...INIT_STATE })
    clearRates()
    clearimage()
  }


  /** Funcion para ejecutar Fetch de la imagen */
  const onImage = async (file: File, path: string, code: string, product_id: string) => {
    try {
      const fd = new FormData();

      fd.append('file', file, file.name)
      fd.append('path', path);

      await useProductsApi().images.post(fd, product_id);


    } catch (error) {
      console.log(error)
    }

  }


  /** Funcion para subir datos */
  const onSubmit = async (e: FormSubmitEvent<StoreProductSchema>) => {
    loading.value = true;

    try {
      const obj = await useProductsApi().products.post(e.data);

      toast.add({ title: 'Se ha añadido el producto correctamente', color: 'success' });

      if (image.value.file && image.value.path && obj) {
        await onImage(image.value.file, image.value.path, FormState.code, obj.product.id)
        toast.add({ title: 'Se ha añadido la imagen correctamente', color: 'success' });
      } else {
        toast.add({ title: 'valores incorrectos', color: 'error' });
      }

      cleanForm();
      loading.value = false;

    } catch (error) {
      toast.add({ title: 'Ha habido un problema', color: 'error' });
      loading.value = false;
    }



  }

  return {
    parents,
    FormState,
    subcategories,
    subcategory,
    parent,
    loading,
    onSubmit,
    cleanForm,
    code
  }

}
