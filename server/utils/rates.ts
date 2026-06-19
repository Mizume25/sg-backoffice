import type { H3Event } from 'h3'
import { initClient } from './service';
/** Queries para crear rates */
export async function createRates(e:H3Event , data:CreateRate[]) {

    const supabase = await initClient(e);

    const { error } = await supabase
    .from('rates')
    .insert(data);

    if(error) throw createError({ statusCode: 409 , message:error.message})
}