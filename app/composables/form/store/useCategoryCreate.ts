import type { StoreCategorySchema } from "~~/shared/schemas/categories/create";
import type { FormSubmitEvent } from '@nuxt/ui'

/*** Composable Lógica de Fomrulario */
export const useCategoryCreate = () => {
  /** Estado incial del formulario */
  const INIT_STATE = {
    name: '',
    code: '',
    description: '',
    parent_id: undefined,
  }


  /** Construimos el objeto Fromulario reactivo  */
  const FormState = reactive<Partial<StoreCategorySchema>>({ ...INIT_STATE });

  /** Carga de Boton */
  const loading = ref(false)



  /** Funcion para añadir una categoria mediante la api */
  const onSubmit = async (e: FormSubmitEvent<StoreCategorySchema>) => {

    loading.value = true;

    /** Construir objeto */
    const category: CreateCategory = {
      ...e.data,
      name: e.data.name.toLocaleLowerCase(),
    }

    /** Peticiones al endpoint  */
    try {

      await useCategoriesApi().categories.post(category);


      useNotify().success('Categoria Creada Correctamente')
      clean()

    } catch (e) {
      loading.value = false;
      useNotify().success('Hubo problemas en crear la categoria')
    }




  }

  const clean = () => {
    Object.assign(FormState, { ...INIT_STATE })

    loading.value = false
  }

  /** Helper para obtener un codigo  */
  const makeCode = (name: string | undefined) => {
    return name?.slice(0, 3).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
  }


  /** Estructura de control */
  let allow = ref(true);


  return {
    FormState,
    loading,
    onSubmit,
    makeCode,
    allow
  }

}
