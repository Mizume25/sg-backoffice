/** Rutas protegidas  */
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const publicPaths = ['/auth/login', '/auth/register']

  if (to.path === '/') {
    return navigateTo('/auth/login')
  }

  if (!publicPaths.includes(to.path) && !user.value) {
    return navigateTo('/auth/login')
  }

  if(user.value && publicPaths.includes(to.path)){
    return navigateTo('/auth/dashboard')
  }

  
})
