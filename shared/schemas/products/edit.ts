import { reactive, type Reactive } from 'vue';
import { z } from 'zod'
import type { EditProduct } from '~~/shared/types/definitons';

/** Schema para editar producto */
export const ProductSchema : z.ZodType<EditProduct>  = z.object({
    name: z.string().optional(),
    code:z.string().optional(),
    description:z.string().optional(),
})

export type UpdateProductSchema = z.output<typeof ProductSchema>;

