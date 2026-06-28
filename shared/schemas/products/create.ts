import { z } from 'zod';

/** Esquema para imagenes */
export const imagesSchema = z.object({
    path:z.string(),
    file: z.instanceof(File).nullable(),
})

export type StoreImageSchema = z.output<typeof imagesSchema>;

/** Esquema para tarifas */
export const ratesSchemaCreate = z.object({
    price:z.number().min(1, 'Añade Valor'),
    start_date:z.string().min(1,'Añade Fecha Incial'),
    end_date:z.string().min(1,'Añade Fecha Final'),
    product_id:z.string().optional()
})

export type StoreRateSchema = z.output<typeof ratesSchemaCreate>;

/** Esquema de fomrulario de un Producto */
export const Schema = z.object({
    name: z.string().min(1, 'Necesitas un nombre').max(25, 'Maximo de caracteres'),
    code: z.string().min(1, 'Necesitas un codigo'),
    description: z.string().min(10, 'Necesitas una descripcion mas larga').max(200, 'Maximo de caracteres'),
    category: z.uuid({ message: 'Necesitas una categoria padre inicial' }),
    subcategory: z.uuid({ message: 'Necesitas una subcategoria inicial' }),
    rates:z.array(ratesSchemaCreate).min(1, 'Debe agregar 1 tarifa minima'),
    
})

export type StoreProductSchema = z.output<typeof Schema>;