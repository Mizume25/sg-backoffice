import { serverSupabaseUser , serverSupabaseClient} from '#supabase/server'
import { Database } from '~~/shared/database.types'

export default defineEventHandler(async (e) => {
  const supabase = await serverSupabaseClient<Database>(e)
  const { error } = await supabase.auth.signOut()
  if (error) throw createError({ statusCode: 500, message: 'Error al cerrar sesión', cause: error.message })
  return { success: true }
})