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





  /** Funcion para subir datos */
  const onSubmit = async (e: FormSubmitEvent<StoreProductSchema>) => {
    loading.value = true;



    try {
      await $fetch('/api/products', { method: 'POST', body: e.data });


      toast.add({ title: 'Se ha añadido el producto correctamente', color: 'success' });


      if (image.value.file && image.value.path) {

        const fd = new FormData();

        fd.append('file', image.value.file, image.value.file.name)
        fd.append('path', `${FormState.code}/${image.value.path}`)

        try {


          await $fetch('/api/images', {
            method: 'POST',
            body: fd
          })



        } catch (error) {
          console.log(error)
        }

      } 
      cleanForm();
      loading.value = false;

    } catch (err) {
      console.log('ERROR:', err);
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
