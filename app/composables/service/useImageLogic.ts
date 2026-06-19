import { type StoreImageSchema } from "~~/shared/schemas/products/create"

export const useImageLogic = () => {

  /** Imagenes reactivas  */
  const image = useState<StoreImageSchema>('product-image', () => ({ path: '', file: null }))
  const preview = useState<string | null>('product-preview', () => null)


  const inputRef = ref<HTMLInputElement | null>(null)



  /** Guardamos las variables */
  const onSave = (file: File | undefined) => {
    if (!file) return;
    image.value.file = file
    image.value.path = file.name

  }



  const triggerInput = () => inputRef.value?.click()


  const onFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    onSave(file)
  }

  const onDrop = (e: DragEvent) => {
    const file = e.dataTransfer?.files?.[0]
    if (file) onSave(file)
  }

  const clearimage = () => {
    preview.value = null

    Object.assign(image, {
      path: '',
      file: null
    })

    inputRef.value = null
  }


 









  return {
    inputRef,
    preview,
    triggerInput,
    onFileChange,
    onDrop,
    image,
    clearimage
  }
}
