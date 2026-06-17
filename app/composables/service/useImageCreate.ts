import { type StoreImageSchema } from "~~/shared/schemas/products/create"

export const useImageCreate = () => {

  /** Imagenes reactivas  */
  const image = reactive<StoreImageSchema>({
    path: '',
    file: {} as File
  })


  const inputRef = ref<HTMLInputElement | null>(null)
  const preview = ref<string | null>(null)



  /** Guardamos las variables */
  const onSave = (file: File | undefined) => {
    if(!file) return;

    image.path = file.name;
    image.file = file;

  }



  const triggerInput = () => inputRef.value?.click()

  const loadPreview = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => preview.value = e.target?.result as string
    reader.readAsDataURL(file)
  }

  /** Cargamos File */
  const onFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]

    onSave(file)
    
    if (file) loadPreview(file)
  }

  const onDrop = (e: DragEvent) => {
    const file = e.dataTransfer?.files?.[0]
    if (file) loadPreview(file)
  }


  






  return {
    inputRef,
    preview,
    triggerInput,
    loadPreview,
    onFileChange,
    onDrop,
    image
  }
}
