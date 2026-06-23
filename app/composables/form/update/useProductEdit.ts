import { type UpdateProductSchema } from '~~/shared/schemas/products/edit';

/*** Composable logica edit  */
export const useProductEdit = (id: string) => {

  /** Items  */
  const { confirm } = useConfirm();
  const toast = useToast();
  
  /** Objetos Necesarios */
  const ProductRecord = useProductsStore();
  const product = computed(() => ProductRecord.findProduct(id))


  /*** Estado de Fomrulario */
  const FormProductState = reactive<UpdateProductSchema>({
    name: product.value?.name,
    code: product.value?.code,
    description: product.value?.description
  });

  type Section = '' | 'rates' | 'images' | 'categories';



  const isOpen = ref(false);

  const edit = ref<Section>('');

  const showSection = (section: Section) => {
    edit.value = section;
    isOpen.value = true
  }


  



 






  return { FormProductState, product, isOpen, edit, showSection }
}
