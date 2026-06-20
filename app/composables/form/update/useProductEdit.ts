import { initStateProduct, type UpdateProductSchema } from '~~/shared/schemas/products/edit';

export const useProductEdit = (id : string) => {
  
  /** Obtenemos el pproducto */
  const { get , refreshGet } = useProductsApi();
  const { data: productRecord } = get(id);

 

  const p : UpdateProductSchema = {
    name: productRecord.value?.name,
    code: productRecord.value?.code,
    description: productRecord.value?.description,
  }


  const FormStateProduct = initStateProduct(p)
  

  return {
    productRecord
    
  }
}
