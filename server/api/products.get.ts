
import { serverSupabaseClient } from '#supabase/server'


/**
 * API para obtener la lista completa de productos
 * @returns {ProductRecord[]} Lista de productos
 */
export default eventHandler(async(event) => {

    /** Peticioon al servidor */
    const supabase = await serverSupabaseClient(event);

     /** Joineamos las relaciones de products */
    const { data , error }= await supabase
    .from('products')
    .select(`*,
        categories_products(categories(*)),
        rates(*),
        product_images (*)
    `);
    
    /** Control de erores */
    if (error) throw createError({ statusCode: 404, message: error.message })
    
    /** Retornamos valor */
    return data;
    
    
});