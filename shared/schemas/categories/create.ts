import { string, uuid, z } from 'zod'
import type { CreateCategory } from '~~/shared/types/definitons';

export const Schema = z.object({
    name: z.string().min(1, 'Necesitas un nombre'),
    code: z.string().min(1, 'Necesitas un codigo'),
    description: z.string().min(10, 'Necesitas una descripcion mas larga').max(200, 'Maximo de caracteres'),
    parent_id: z.string().optional()
});

export type StoreCategorySchema = z.output<typeof Schema>;

