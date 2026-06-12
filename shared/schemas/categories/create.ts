import { string, z } from 'zod'
import type { CreateCategory } from '~~/shared/types/definitons'


/** Esquema para crear una categoria */
export const Schema : z.ZodType<CreateCategory> = z.object({
    name:z.string().min(1, 'Necesitas un nombre'),
    code:z.string().min(1, 'Necesitas un codigo'),
    description:string().min(1, 'Necesitas una descripcion'),
    parent_id:z.string().nullish(),
});

/** Exportamos esquema  */
export type StoreCategorySchema = z.output<typeof Schema> 