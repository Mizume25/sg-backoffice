/**
 * Gestiona la autenticación del usuario
 * @returns user
 */
import type { LoginCredentials } from "~~/shared/types/definitons"

export const useAuth = () => {
  const user = {
    get:() => $fetch('/api/auth/profile', {method:'GET'}),
    logout:() => $fetch('/api/auth/logout' , {method:'POST'}),
  }
  return { user }

}
