import type { ProfileRecord } from "~~/shared/types/definitons"

/** Variable perfil */
export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileRecord | null>(null)

  const setProfile = (data: ProfileRecord) => {
    profile.value = data
  }

  const clearProfile = () => {
    profile.value = null
  }

  return { profile, setProfile, clearProfile }
})