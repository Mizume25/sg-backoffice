import { type StoreImageSchema, type StoreProductSchema } from '~~/shared/schemas/products/create';
export const useProductCreate = () => {

  /** Variables que necesitaremos */
  const store = useCategoriesStore();
  const { parents} = storeToRefs(store);



  /*** Estado Inicial */
  const INIT_STATE = {
    name: '',
    code: '',
    description: '',
    category: parents?.value?.[0]?.id ?? '', 
    subcategory: parents?.value?.[0]?.categories[0]?.id ?? '',
    rates: [],
    image: {} as StoreImageSchema,

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



  return {
    parents,
    FormState,
    subcategories,
    store,
    subcategory,
    parent,
    makeCode
  }

}
