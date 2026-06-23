/** Tipo de opciones */
type Options = {
  title?: string,
  description?: string
  confirm?: string
  cancel?: string
}


/** Opciones y configuracion */
const onConfirm = ref(false);
const options = ref<Options>({})
let resolver: ((value: boolean) => void) | null = null

export const useConfirm = () => {

  /** Funcion open */
  function confirm(opts: Options = {}): Promise<boolean> {
    options.value = {
      title: 'Confirmar',
      description: '¿Seguro que quieres continuar?',
      confirm: 'Borrar',
      cancel: 'Cancelar',
      ...opts,
    }
    onConfirm.value = true
    return new Promise((resolve) => {
      resolver = resolve
    })
  }

  /** Funcion resolve */
  function handle(value: boolean) {
    onConfirm.value = false
    resolver?.(value)
    resolver = null
  }

  return { onConfirm, options, confirm, handle }
}
