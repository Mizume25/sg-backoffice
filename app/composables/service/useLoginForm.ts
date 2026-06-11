/**
 * Variable reactivas del login
 * @returns form , loading
 */
export const useLoginForm = () => {
  
  /** Campos Reactivos */
  const form = reactive({
    email:'',
    password:''

  });
  
   /** Carga del boton  */
  const loading = ref(false)

  
  return { form , loading }


 
}
