import { SupabaseClient } from '@supabase/supabase-js';
import { EditRate } from '~~/shared/types/definitons';
/** Queries para crear rates */
export async function createRates(s: SupabaseClient , data:CreateRate[]) {
    const { error } = await s
    .from('rates')
    .insert(data);

    if(error) throw createError({ statusCode: 409 , message:error.message})
}



/** Queries para crear rates */
export async function editRate(s: SupabaseClient , data:EditRate , id:string | undefined) {
    if(!id) return 

    const { error } = await s
    .from('rates')
    .update(data)
    .eq('id', id);

    if(error) throw createError({ statusCode: 409 , message:error.message})
}

/** queri pare eliminar rate especifico */
export async function deleteRate(s: SupabaseClient , id:string | undefined) {

    if(!id) return;
    
    const { error } = await s
    .from('rates')
    .delete()
    .eq('id', id);

    if(error) createError({ statusCode: 404 , message: error.message });

}


/** Borrar rates relacionados */
export async function deletRates(s : SupabaseClient , id: string) {

    const { error }  = await s
    .from('rates')
    .delete()
    .eq('product_id' , id)

    if(error) throw createError({ statusCode: 404 , message: error.message })
}