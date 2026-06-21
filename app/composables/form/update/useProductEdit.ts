import {type UpdateProductSchema } from '~~/shared/schemas/products/edit';

export const useProductEdit = (id : string) => {
  
  /** Obtenemos el pproducto */
  const { get , refreshGet } = useProductsApi();
  const { data: productRecord } = get(id);


  const product : EditProduct = {
    name: productRecord.value?.name,
    code: productRecord.value?.code,
    description: productRecord.value?.description,
  }     

  /*** Estado de Fomrulario */
  const FormProductState = reactive<UpdateProductSchema>({
    name: '',
    code:'',
    description:'',
  });


  

  

  return {
    productRecord,
    FormProductState,
    product
    
  }
}
