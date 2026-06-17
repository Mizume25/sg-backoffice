export const useImageCreate = () => {
  const inputRef = ref<HTMLInputElement | null>(null)
  const preview = ref<string | null>(null)

  const triggerInput = () => inputRef.value?.click()

  const loadPreview = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => preview.value = e.target?.result as string
    reader.readAsDataURL(file)
  }

  const onFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
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
    onDrop
  }
}
