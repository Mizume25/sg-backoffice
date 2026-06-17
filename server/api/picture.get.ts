import { serverSupabaseClient } from '#supabase/server'

/**
 * Pruebas Servidor
 */
export default eventHandler(async(e) => {

    const supabase = await serverSupabaseClient(e);

    const { createBucket } = await supabase.storage;

    
   
    

    

})