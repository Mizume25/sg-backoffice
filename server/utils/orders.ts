/*** Funciiones de Orders
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { StoreOrderSchema } from "~~/shared/schemas/orders/create";
import { OrderRecord } from "~~/shared/types/definitons";
import type { UpdateOrderSchema } from '~~/shared/schemas/orders/edit';

/**
 * Lista de Orders
 * @param s SupabaseClient
 * @returns Lista de Orders
 */
export async function getOrders(s:SupabaseClient) : Promise<OrderRecord[]> {
    const {data, error } = await s
    .from('orders')
    .select(`*,
    products(*, product_images(*))
  `);

    if(error) throw createError({ statusCode:404 , message:'No se encontro orders' , cause: error.message})

    return data;
}

/**
 * Crear Order
 * @param s SupabaseClient
 * @param order CrateOrder
 */
export async function createOrder(s:SupabaseClient , order:StoreOrderSchema) {
    const { error } = await s
    .from('orders')
    .insert(order);
    if(error) throw createError({ statusCode:409 , message:'No se pudo crear el pedido' , cause:error.message })

}

/**
 * Eliminar Order
 * @param s SupabaseClient
 * @param id string
 */
export async function deleteOrder(s:SupabaseClient , id:string) {

    const { error } = await s.from('orders').delete().eq('id' , id);
    
    if(error) throw createError({ statusCode: 404 , message:'No se ha encontrado la orden' , cause:error.message })

}


/**
 * Eliminar Order
 * @param s SupabaseClient
 * @param id string
 */
export async function editOrder(s:SupabaseClient ,id:string, body: UpdateOrderSchema) {

    const { error } = await s.from('orders').update(body).eq('id' , id);
    
    if(error) throw createError({ statusCode: 404 , message:'No se ha encontrado la orden' , cause:error.message })

}