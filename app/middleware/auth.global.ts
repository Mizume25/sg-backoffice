/** Middleware de redireccionamiento de autentificado */
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const publicPaths = ['/auth/login', '/auth/register']

  /** Si se diriga a un path que no sea los publicos y es un usuario invalid, vuelve a auth */
  if (!publicPaths.includes(to.path) && !user.value) {
    return navigateTo('/auth/login')
  }

  /** En caso de qeu este validado */
  if (user.value && publicPaths.includes(to.path)) {
    return navigateTo('/auth/dashboard')
  }




})