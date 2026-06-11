/**
 * Lista de Categorias
 * @returns {Category[]} Lista de productos
 */
import { serverSupabaseClient } from '#supabase/server'
export default eventHandler(async(event) => {

    /** Peticion */
    const supabase = await serverSupabaseClient(event);

    /** Query */
    const { data , error } = await supabase
    .from('categories')
    .select(`*, categories(*)`);

    /** Controlamos Errores */
    if(error) throw createError({ statusCode:404 , message:error.message})

    
    return data;


})