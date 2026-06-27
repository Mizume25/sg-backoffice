import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Insertar un array de Tarifas Asociadas
 * @param s SupabaseClient
 * @param data CreateRate []
 */
export async function createRates(s: SupabaseClient , data:CreateRate[]) {
    const { error } = await s
    .from('rates')
    .insert(data);

    if(error) throw createError({ statusCode: 409 , message:'No se pudo insertar los ratess' , cause:error.message})
    
}



/**
 * Editar una Tarifa especifica
 * @param s SupabaseClient
 * @param data EditRate
 * @param id string
 */
export async function editRate(s: SupabaseClient , data:EditRate , id:string) {

    const { error } = await s
    .from('rates')
    .update(data)
    .eq('id', id);

    if(error) throw createError({ statusCode: 409 , message:'No se pudo editar el rate' , cause:error.message})
}

/**
 * Borrar Rate Especifica
 * @param s SupabaseClient
 * @param id string
 */
export async function deleteRate(s: SupabaseClient , id:string) {
    const { error } = await s
    .from('rates')
    .delete()
    .eq('id', id);

    if(error) throw createError({ statusCode: 404 , message: 'No se pudo encontrar la rate' , cause:error.message });

}


/**
 * Borrar Todas las tarifas asociadas de un producto
 * @param s Supabase
 * @param id string
 */
export async function deletRates(s : SupabaseClient , id: string) {

    const { error }  = await s
    .from('rates')
    .delete()
    .eq('product_id' , id)

    if(error) throw createError({ statusCode: 404 , message: 'No se pudo encontrar la rate' , cause:error.message })
}