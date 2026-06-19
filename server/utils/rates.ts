import type { H3Event } from 'h3'
import { initClient } from './service';
import { SupabaseClient } from '@supabase/supabase-js';
/** Queries para crear rates */
export async function createRates(s: SupabaseClient , data:CreateRate[]) {
    const { error } = await s
    .from('rates')
    .insert(data);

    if(error) throw createError({ statusCode: 409 , message:error.message})
}


/** Borrar rates relacionados */
export async function deletRate(s : SupabaseClient , id: string) {

    const { error }  = await s
    .from('rates')
    .delete()
    .eq('product_id' , id)

    if(error) throw createError({ statusCode: 404 , message: error.message })
}