import { reactive, type Reactive } from 'vue';
import { z } from 'zod'
import type { EditProduct, Product } from '~~/shared/types/definitons';

/** Schema para editar producto */
export const ProductSchema : z.ZodType<EditProduct>  = z.object({
    name: z.string().optional(),
    code:z.string().optional(),
    description:z.string().optional(),
})

export type UpdateProductSchema = z.output<typeof ProductSchema>;

/** Funcion para Estado Inicial */
export const initStateProduct = (product : EditProduct | undefined) : Reactive<UpdateProductSchema> | undefined => {
    if(!product) return undefined;
    const state = reactive<UpdateProductSchema>({
        name: product.name,
        code: product.code,
        description: product.description,
    })
    return state
}