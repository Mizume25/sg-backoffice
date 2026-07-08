
/** Toast Reutilizables */
export const useNotify = () => {
  const toast = useToast();
  /* Inicias y guardar 1 contexto por toast */
  const nuxtApp = useNuxtApp();
  
  const safe = (fn: () => void) => nuxtApp.runWithContext(fn);
  return {
    success: (description: string) => safe(() => toast.add({ title: description, icon: 'lucide:check' })),
    error: (description: string) => safe(() => toast.add({ title: description, color: 'error', icon: 'lucide:x' })),
    info: (description: string) => safe(() => toast.add({ title: description, color: 'info', icon: 'lucide:info' })),
    warning: (description: string) => safe(() => toast.add({ title: description, color: 'warning', icon: 'lucide:triangle-alert' }))
  }
}
