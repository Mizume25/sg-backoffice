
/** Toast Reutilizables */
export const useNotify = () => {
  const toast = useToast();
  return {
    success: (description:string) => toast.add({title:description , icon:'lucide:check'}),
    error: (description:string) => toast.add({title:description , color:'error' ,icon:'lucide:x'}),
    info: (description:string) => toast.add({title:description , color:'info' ,icon:'lucide:info'}),
    warning: (description:string) => toast.add({title:description , color:'warning' ,icon:'lucide:triangle-alert'})
  }
}
