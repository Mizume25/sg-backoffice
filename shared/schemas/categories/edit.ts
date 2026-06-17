import { reactive, type Reactive } from 'vue';
import { string, z } from 'zod'
import type { CategoryRecord, EditCategory } from '~~/shared/types/definitons';

/** Esuqmea para editar categorias */
export const Schema : z.ZodType<Partial<EditCategory>> = z.object({
    name:z.string().optional(),
    code:z.string().optional(),
    description:z.string().optional(),
    parent_id: z.string().uuid().nullish()
})

/** Tipado de Esquema */
export type UpdateCategorySchema = z.output<typeof Schema>;


/** Funcion para Estado Inicial */
export const initState = (category : CategoryRecord | null) : Reactive<UpdateCategorySchema> | undefined => {
    
    if(!category) return undefined;


    const state = reactive({
        name: category.name,
        code: category.code,
        description: category.description,
        parent_id:category.parent_id
    })


    return state
}