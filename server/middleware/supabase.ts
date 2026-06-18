import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const client = await serverSupabaseClient(event)

  event.context.supabase = client
})