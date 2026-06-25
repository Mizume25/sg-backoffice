/** Schema para Order */
import { z } from 'zod';
export const OrderSchema = z.object({
    amount: z.number().min(1 , 'Monto minimo requerido'),
    units: z.number().min(1 , 'Unidades minimas requeridas'),
    order_date: z.string().min(1 , 'Fecha requerida'),
    product_id: z.string().min(1, 'Producto minimo asociado')
})

export type StoreOrderSchema = z.output<typeof OrderSchema>;

