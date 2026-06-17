import { type StoreProductSchema } from '~~/shared/schemas/products/create';
export const useProductCreate = () => {

  /** Variables que necesitaremos */
  const store = useCategoriesStore();
  const { parents } = storeToRefs(store);


  /*** Estado Inicial */
  const INIT_STATE = {
    name: '',
    code: '',
    description: '',
    category: parents?.value?.[0]?.id ?? '', 
    subcategory: parents?.value?.[0]?.categories[0]?.id ?? '',
    rates: []
  }

  /** Estado reactivo */
  const FromState = reactive<StoreProductSchema>({ ...INIT_STATE });









  return {
    parents,
  FromState
  }

}
