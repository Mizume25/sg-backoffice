export const useAuth = () => {

  /** Objeto supabase y usuario actual */
  const supabase = useSupabaseClient();
  const user = useSupabaseUser()


  const { clearProfile } = useProfileStore()

  /** Cerrar Session */
  const logout = async () => {
    await supabase.auth.signOut()
    clearProfile()
    navigateTo('/auth/login')
  }


  /*** Loguear  */
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })


    if (error) return { data, error }

    return { data, error }
  }

  /** Obtener Perfiles */
  const fetchProfile = async () => {

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value?.sub!)
      .single()


   
    return {
      ...data!,
      email: user.value?.email
    }
  }


  return { login, fetchProfile, logout }

}
