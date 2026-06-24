export const useImageEdit = (id: string) => {


   const { triggerInput, onFileChange, onDrop, image, inputRef, clearimage
   } = useImageLogic();

   /*** Imagenes Inciales */
   const toast = useToast();
   const ProductRecord = useProductsStore();
   const images = computed(() => ProductRecord.findProduct(id)).value?.product_images;
   const code = computed(() => ProductRecord.findProduct(id)).value?.code;
   const URL = IMAGE_URL + code + '/';



   /** Guardar Imagen */
   watch(image.value, async (newImage) => {

      if (!newImage) return;
      if (!image.value.file || !image.value.path) return
      const fd = new FormData();

      fd.append('file', image.value.file, image.value.file.name)
      fd.append('path', `${image.value.path}`)

      try {


         await $fetch('/api/images', {
            method: 'POST',
            body: fd
         })


         toast.add({ title: 'Imagen Subida correctamente', color: 'info', icon: 'lucide:info' })
         clearimage();

      } catch (error) {
         toast.add({ title: 'Ha habido un problema al subir la imagen', color: 'error', icon: 'lucide:x' })
         clearimage();
      }




   })

   const removeImage = async (id: string) => {
      try {

         await $fetch(`/api/images/${id}`, { method: 'DELETE' });

         toast.add({ title: 'Se ha borrado correctamente la imagen', color: 'success', icon: 'lucide:trash' })

      } catch (error) {
         console.log(error)
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
