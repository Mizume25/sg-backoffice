/*** Funciiones de Orders
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { CreateOrder } from "~~/shared/types/definitons";

export async function createOrder(s:SupabaseClient , order:CreateOrder) {
    
    const { error } = await s
    .from('orders')
    .insert(order);

    if(error) createError({ statusCode:409 , message:'No se pudo crear el pedido' , cause:error.message })
    
        
}