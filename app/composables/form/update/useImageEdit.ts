export const useImageEdit = (id:string) => {

   const ProductRecord = useProductsStore();
   const images = computed(() => ProductRecord.findProduct(id)).value?.product_images;
   const code = computed(() => ProductRecord.findProduct(id)).value?.code;
   const URL = IMAGE_URL + code + '/';

   


   return {
    images,
    URL
   }

}
