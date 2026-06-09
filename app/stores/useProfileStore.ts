
/** Variable perfil */
export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User | null>(null)

  const setProfile = (data: User) => {
    profile.value = data
  }

  const clearProfile = () => {
    profile.value = null
  }

  return { profile, setProfile, clearProfile }
})