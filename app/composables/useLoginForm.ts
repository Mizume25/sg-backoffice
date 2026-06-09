export const useLoginForm = () => {
  
  /** Campos Reactivos */
  const form = reactive({
    email:'',
    password:''

  });
  return { form }


 
}
