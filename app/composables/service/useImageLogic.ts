import { type StoreImageSchema } from "~~/shared/schemas/products/create"

/**
 * Logica de Imagen
 * @returns     inputRef,
    triggerInput,
    onFileChange,
    onDrop,
    image,
    clearimage
 */
export const useImageLogic = () => {

  /**
   * Estado Global de imagen
   */
  const image = useState<StoreImageSchema>('product-image', () => ({ path: '', file: null }))
  

  /**
   * Estado reactvo del input
   */
  const inputRef = ref<HTMLInputElement | null>(null)



  /**
   * Guardamos valores de imagen
   * @param file FILe
   */
  const onSave = (file: File | undefined) => {
    if (!file) return;
    image.value.file = file
    image.value.path = file.name

  }


  /**
   * Triger del input para guardar estado reactivo
   * @returns 
   */
  const triggerInput = () => inputRef.value?.click()


  /**
   * Guardar File con la funcition onSave
   * @param e Event
   */
  const onFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    onSave(file)
  }

  /**
   * Abrir Archivos
   * @param e DragEvent
   */
  const onDrop = (e: DragEvent) => {
    const file = e.dataTransfer?.files?.[0]
    if (file) onSave(file)
  }

  /**
   * Limpiar imagen
   */
  const clearimage = () => {
   
    Object.assign(image.value, {
      path: '',
      file: null
    })

    inputRef.value = null
  }


  return {
    inputRef,
    triggerInput,
    onFileChange,
    onDrop,
    image,
    clearimage
  }
}
