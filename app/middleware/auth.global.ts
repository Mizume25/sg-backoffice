export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const publicPaths = ['/auth/login', '/auth/register']

  // '/' ya no llega aquí, lo maneja pages/index.vue
  if (!publicPaths.includes(to.path) && !user.value) {
    return navigateTo('/auth/login')
  }

  if (user.value && publicPaths.includes(to.path)) {
    return navigateTo('/auth/dashboard')
  }

  if (user.value) {
    await callOnce(async () => {
      const { fetchProfile } = useAuth()
      const { setProfile } = useProfileStore()
      const data = await fetchProfile()
      setProfile(data)
    })
  }
})