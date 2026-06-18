import { type StoreImageSchema, type StoreProductSchema } from '~~/shared/schemas/products/create';
import type { FormSubmitEvent } from '@nuxt/ui'
import { toast } from '#build/ui';

export const useProductCreate = () => {

  /** Variables que necesitaremos */
  const store = useCategoriesStore();
  const { parents } = storeToRefs(store);


  const { clearPreview } = useImageLogic();
  const { clearRates } = useRateLogic()


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
    image: {
      path: '',
      file: null
    } as StoreImageSchema,

  }

  /** Estado reactivo */
  const FormState = reactive<StoreProductSchema>({ ...INIT_STATE });

  const parent = computed(() => store.findCategory(FormState.category))

  const subcategories = computed(() => parent.value?.categories);

  const subcategory = computed(() => parent.value?.categories[0])

  /** Helper para obtener un codigo  */
  const makeCode = (name: string | undefined) => {
    return name?.slice(0, 2).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  }



  const cleanForm = () => {
    Object.assign(FormState, { ...INIT_STATE })
    clearPreview()
    clearRates()
  }


  const seralizeJSON = (e: FormSubmitEvent<StoreProductSchema>) => {
    const fd = new FormData();


    Object.entries(e.data).forEach(([key, value]) => {

      if (key === 'image') return;

      fd.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    });


    if (e.data.image?.file) {
      fd.append('image', e.data.image.file);
      fd.append('imagePath', e.data.image.path);
    }

    return fd;
  }


  /** Funcion para subir datos */
  const onSubmit = async (e: FormSubmitEvent<StoreProductSchema>) => {
    loading.value = false;

    const fd = seralizeJSON(e);

    try {

      await $fetch('/api/product', {
        method: 'POST',
        body: fd
      })

      toast.add({ title: 'Se ha añadido el producto correctamente', color: 'success' })
      loading.value = false;
      cleanForm();

    } catch (e) {

      loading.value = false;
      console.log(e)
      toast.add({ title: 'Ha habido un problema', color: 'error' })
    }
  }

  return {
    parents,
    FormState,
    subcategories,
    store,
    subcategory,
    parent,
    makeCode,
    loading,
    onSubmit,
    seralizeJSON,
    cleanForm
  }

}
