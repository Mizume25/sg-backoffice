import { z } from 'zod';

/** Esquema para imagenes */
export const imagesSchema = z.object({
    path:z.string(),
    file: z.instanceof(File).nullable(),
})

export type StoreImageSchema = z.output<typeof imagesSchema>;

/** Esquema para tarifas */
const ratesSchema = z.object({
    price:z.number().min(1, 'Debe tener un valor incial'),
    start_date:z.string().min(1,'Debe tener Fecha final'),
    end_date:z.string().min(1,'Debe tener Fecha de final'),
})

export type StoreRateSchema = z.output<typeof ratesSchema>;

/** Esquema de fomrulario de un Producto */
export const Schema = z.object({
    name: z.string().min(1, 'Necesitas un nombre').max(25, 'Maximo de caracteres'),
    code: z.string().min(1, 'Necesitas un codigo'),
    description: z.string().min(10, 'Necesitas una descripcion mas larga').max(200, 'Maximo de caracteres'),
    category:z.uuid(),
    subcategory:z.uuid(),
    rates:z.array(ratesSchema),
    
})

export type StoreProductSchema = z.output<typeof Schema>;