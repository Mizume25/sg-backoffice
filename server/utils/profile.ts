import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~~/shared/database.types";
import { serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import type { H3Event } from 'h3'
import { ProfileRecord } from "~~/shared/types/definitons";

/***
 * Obtiene perfil de usuario
 * 
 */
export const getProfile = async (e: H3Event): Promise<ProfileRecord> => {
  const auth = await serverSupabaseUser(e)
   if (!auth) throw createError({ statusCode: 401, message: 'No autenticado' })
  
  const supabase = await serverSupabaseClient<Database>(e)
  const { data: profile, error: profileError } = await supabase
    .from('profiles').select('*').eq('id', auth.sub).single()
  if (profileError) throw createError({ statusCode: 500, message: 'Error al obtener el perfil', cause: profileError.message })

  return { ...profile, email: auth.email }
}


