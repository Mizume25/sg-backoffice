import { serverSupabaseClient } from '#supabase/server'
import type { H3Event } from 'h3'
/** Queries para crear rates */
export async function createRates(e:H3Event , data:CreateRate[]) {

    const supabase = await serverSupabaseClient(e);

    const { error } = await supabase
    .from('rates')
    .insert(data);

    if(error) throw createError({ statusCode: 409 , message:'No se pudo añadir las tarifas'})
}