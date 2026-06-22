import { type UpdateProductSchema } from '~~/shared/schemas/products/edit';

export const useProductEdit = (id: string) => {

  /** Obtenemos el pproducto */
  const ProductRecord = useProductsStore();
  const { allproducts } = storeToRefs(ProductRecord);
  const product = computed(() => ProductRecord.findProduct(id))


  /*** Estado de Fomrulario */
  const FormProductState = reactive<UpdateProductSchema>({
    name: product.value?.name,
    code: product.value?.code,
    description: product.value?.description
  });







  return {FormProductState , product}
}
