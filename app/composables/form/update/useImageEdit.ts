/*** Composable de edicion de imagenes de producto */
export const useImageEdit = (product_id: string) => {

   /** Reaprovehcmaos la logica de una imagen */
   const { triggerInput, onFileChange, onDrop, image, inputRef, clearimage } = useImageLogic();



   /*** Valores Inciales */
   const toast = useToast();
   const { data: product } = useProductsApi().products.useOne(product_id);
   const images = computed(() => product.value?.product_images)
   const code = computed(() => product.value?.code);
   const URL = makeURL(code.value)



   /** Guardar Imagen en el momento en el que la sube*/
   watch(image.value, async (newImage) => {

      if (!newImage) return;
      if (!image.value.file || !image.value.path) return
      const fd = new FormData();

      fd.append('file', image.value.file, image.value.file.name)
      fd.append('path', `${image.value.path}`)

      try {


         await useProductsApi().images.post(fd, product_id);


         toast.add({ title: 'Imagen Subida correctamente', color: 'info', icon: 'lucide:info' })
         clearimage();

      } catch (error) {
         toast.add({ title: 'Ha habido un problema al subir la imagen', color: 'error', icon: 'lucide:x' })
         clearimage();
      }




   })

   /*** Borrar imagen especifica  */
   const removeImage = async (id: string) => {

      if (images.value!.length < 2) {
         toast.add({ title: 'Debe existir al menos 1 imagen', color: 'info', icon: 'lucide:info' })
         return;
      }
      try {

         await useProductsApi().images.delete(product_id, id);

         toast.add({ title: 'Se ha borrado correctamente la imagen', color: 'success', icon: 'lucide:trash' })

      } catch (error) {
         toast.add({ title: 'Ha habaido un problema', color: 'error', icon: 'lucide:trash' })
      }
   }





   return {
      images,
      URL,
      triggerInput,
      onDrop,
      inputRef,
      onFileChange,
      removeImage
   }

}
