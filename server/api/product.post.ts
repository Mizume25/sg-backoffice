import { serverSupabaseClient } from '#supabase/server'

/** Endpoint para crear un Producto */
export default eventHandler(async(e) => {

    const supabase = await serverSupabaseClient(e);

    const body = await readBody(e);


    

    
})