import { type UpdateProductSchema } from '~~/shared/schemas/products/edit';

export const useProductEdit = (id: string) => {

  /** Obtenemos el pproducto */
  const { getProduct, refreshGet } = useProductsApi();
  const { data: productRecord, status } = getProduct(id);


  /*** Estado de Fomrulario */
  const FormProductState = reactive<UpdateProductSchema>({
    name: productRecord.value?.name ?? undefined,
    code: productRecord.value?.code ?? undefined,
    description: productRecord.value?.description ?? undefined,
  });







  return {
    productRecord,
    FormProductState,
    status,

  }
}
