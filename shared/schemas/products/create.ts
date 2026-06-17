import { z } from 'zod';

/** Esquema para tarifas */
const ratesSchema = z.object({
    price:z.number().min(1, 'Debe tener un valor incial'),
    start_date:z.string().min(1,'Debe tener Fecha final'),
    end_date:z.string().min(1,'Debe tener Fecha de final'),
    product_id:z.string()
})

export type StoreRateSchema = z.output<typeof ratesSchema>;

/** Esquema de fomrulario de un Producto */
const Schema = z.object({
    name: z.string().min(1, 'Necesitas un nombre'),
    code: z.string().min(1, 'Necesitas un codigo'),
    description: z.string().min(10, 'Necesitas una descripcion mas larga').max(200, 'Maximo de caracteres'),
    category:z.uuid(),
    subcategory:z.uuid(),
    rates:z.array(ratesSchema),
})

export type StoreProductSchema = z.output<typeof Schema>;