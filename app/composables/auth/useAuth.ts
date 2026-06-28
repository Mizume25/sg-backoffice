import type { ProfileRecord } from "~~/shared/types/definitons"
/**
 * Gestiona la autenticación del usuario
 * @returns user
 */

export const useAuth = () => {
  const user = {
    get:() => $fetch('/api/auth/profile', {method:'GET'}),
    logout:() => $fetch('/api/auth/logout' , {method:'POST'}),
  }



  const profile = useState<ProfileRecord | null>('profile', () => null)
  const setProfile = (data: ProfileRecord) => { profile.value = data }
  const clearProfile = () => { profile.value = null }


  return { user , profile , setProfile , clearProfile }

}
