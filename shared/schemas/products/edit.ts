import { reactive, type Reactive } from 'vue';
import { z } from 'zod'
import type { EditProduct } from '~~/shared/types/definitons';

/** Esquema para tarifas */
export const ratesSchemaEdit = z.object({
    id:z.string().optional(),
    price:z.number().optional(),
    start_date:z.string().optional(),
    end_date:z.string().optional(),
    product_id:z.string().optional(),
})

export type EditRateSchema = z.output<typeof ratesSchemaEdit>;

/** Schema para editar producto */
export const ProductSchema : z.ZodType<EditProduct>  = z.object({
    name: z.string().optional(),
    code:z.string().optional(),
    description:z.string().optional(),
})

export type UpdateProductSchema = z.output<typeof ProductSchema>;

