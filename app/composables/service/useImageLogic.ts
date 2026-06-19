import { type StoreImageSchema } from "~~/shared/schemas/products/create"

export const useImageLogic = () => {

  /** Imagenes reactivas  */
  const image = reactive<StoreImageSchema>({
    path: '',
    file: null,
  })


  const inputRef = ref<HTMLInputElement | null>(null)
  const preview = ref<string | null>(null)



  /** Guardamos las variables */
  const onSave = (file: File | undefined) => {
    if (!file) return;
    image.file = file;

  }



  const triggerInput = () => inputRef.value?.click()

  const loadPreview = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => preview.value = e.target?.result as string
    reader.readAsDataURL(file)
  }



  const onFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    onSave(file)
  }

  const onDrop = (e: DragEvent) => {
    const file = e.dataTransfer?.files?.[0]
    if (file) onSave(file)
  }

  const clearPreview = () => {
    preview.value = null

    Object.assign(image, {
      path: '',
      file: {} as File
    })

    inputRef.value = null
  }


  const uploadIMG = async (): Promise<boolean> => {
    if (image.file && image.path) {
      console.log('5) ENTRO al if, voy a enviar', image.file.name);
      const fd = new FormData();
      fd.append('file', image.file, image.file.name);
      fd.append('path', image.path);

      const res = await $fetch('/api/picture', { method: 'POST', body: fd });
      console.log('6) respuesta del servidor:', res);
      return true
    } else {
      console.log('5b) NO entro al if — falta file o path');
      return false;
    }
  }









  return {
    inputRef,
    preview,
    triggerInput,
    loadPreview,
    onFileChange,
    onDrop,
    image,
    clearPreview,
    uploadIMG
  }
}
