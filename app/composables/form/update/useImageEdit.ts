/*** Composable de edicion de imagenes de producto */
export const useImageEdit = (product_id: string) => {

   /** Reaprovehcmaos la logica de una imagen */
   const { triggerInput, onFileChange, onDrop, image, inputRef, clearimage } = useImageLogic();



   /*** Valores Inciales */
   const { data: product } = useProductsApi().products.useOne(product_id);
   
   const images = computed(() => product.value?.product_images)
   const code = computed(() => product.value?.code);
   const URL = makeURL(code.value)

   const { confirm } = useConfirm();
   const notify = useNotify();

   /** Guardar Imagen en el momento en el que la sube*/
   watch(image.value, async (newImage) => {

      if (!newImage) return;
      if (!image.value.file || !image.value.path) return
      const fd = new FormData();

      fd.append('file', image.value.file, image.value.file.name)
      fd.append('path', `${image.value.path}`)

      try {


         await useProductsApi().images.post(product_id, fd);



         notify.success('Imagen Subida correctamente');
         clearimage();

      } catch (error) {

         notify.error('Ha habido un problema al subir la imagen');
         clearimage();
      }




   })

   /*** Borrar imagen especifica  */
   const removeImage = async (id: string) => {

      if (images.value!.length < 2) {
         notify.warning('Debe existir al menos 1 imagen');
         return;
      }

      const ok = await confirm({
         title: 'Borrar Imagen',
         description: `¿Deseas eliminar este imagen? Esta acción no se puede deshacer.`
      });

      if(!ok) return;

      try {

         await useProductsApi().images.delete(product_id, id);


         notify.success('Se ha borrado correctamente la imagen');

      } catch (error) {
         notify.error('Ha habaido un problema');
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
