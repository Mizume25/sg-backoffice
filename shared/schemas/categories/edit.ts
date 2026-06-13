import { string, z } from 'zod'

/** Esquema para editar categorias y pasamos esos valores */
export const makeEditSchema = (category : CategoryRecord | null): { schema:z.ZodType<EditCategory> | null , state:EditCategory | null }=> {

    if(!category) return { schema: null , state:null};

    /** Esquema a partir de la categoria construida  */
    const Schema : z.ZodType<EditCategory> = z.object({
        name: z.string().default(category.name),
        code: z.string().default(category.code),
        description: z.string().default(category.description),
        parent_id: z.string().uuid().nullable().default(category.parent_id)
    })

    return {
        schema: Schema,
        state: Schema.parse({})
    };
}