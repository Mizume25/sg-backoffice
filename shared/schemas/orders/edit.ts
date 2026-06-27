/** Schema para Order */
import { z } from 'zod';
export const EditOrderSchema = z.object({
    amount: z.number().optional(),
    units: z.number().optional(),
    order_date: z.string().optional(),
    product_id: z.string().optional(),
})

export type UpdateOrderSchema = z.output<typeof EditOrderSchema>;

