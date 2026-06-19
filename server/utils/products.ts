/** Funciones para productos */
import type { H3Event } from 'h3'
import { type StoreProductSchema } from '~~/shared/schemas/products/create'
import { CreateProduct, CreateRate, ProductRecord } from '~~/shared/types/definitons';
import { createRates, deletRate } from './rates';
import { initClient } from './service';
import { SupabaseClient } from '@supabase/supabase-js';
import { deleteImage } from './images';

/*** Crear Productos */
export async function createEntities(e: H3Event, data: StoreProductSchema) {
  const supabase = await initClient(e)

  const obj: CreateProduct = {
    name: data.name,
    code: data.code,
    description: data.description,
  }

  // Secuencial obligatorio: crear → obtener id
  await createProduct(supabase, obj)
  const product = await getProduct(supabase, data.code)

  const rates: CreateRate[] = data.rates.map(rate => ({
    ...rate,
    product_id: product.id,
  }))

  // Estos dos SÍ son independientes → en paralelo
  await Promise.all([
    createRates(supabase, rates),
    attachCategories(supabase, product.id, [data.category, data.subcategory]),
  ])
}


/** Funcion para borrar producto y relaciones de producto */
export async function deleteEntitis(e:H3Event , id:string | undefined) {
    
    if(!id) throw createError({ statusCode:404 , message:'La id no existe' })

    const supabase = await initClient(e);

    /** Eliminamos todaas sus relaciones */
    await Promise.all([
        deleteImage(supabase , id),
        deletRate(supabase , id),
        breakCategories(supabase , id),
    ])

    /** Eliminamos finalmenete el producto */
    const { error } = await supabase
    .from('product')
    .delete()
    .eq('id', id);

    if(error) throw createError({ statusCode: 404 , message: error.message });


}


/** Queria para relacionar producto y categoria */
async function attachCategories(s:SupabaseClient, productID: string, categories: string[]) {
  

    const { error } = await s
        .from('categories_products')
        .insert(
            categories.map((id) => ({
                product_id: productID,
                category_id: id
            }))
        )

    if(error) throw createError({statusCode: 409 , message: error.message})
}


/** Querie para borrar relacion de producto con categories */
async function breakCategories(s: SupabaseClient, id: string) {
    
    const { error } = await s
    .from('categories_products')
    .delete()
    .eq('product_id', id)

    if(error) throw createError({ statusCode: 404 , message: error.message })

}


/** Querie para crear producto */
async function createProduct(s: SupabaseClient, data: CreateProduct) {
    /** Creamos el producto */
    const product: CreateProduct = { ...data }

    /** Insertamos el producto */
    const { error } = await s
        .from('products')
        .insert(product);

    if (error) throw createError({ statusCode: 409, message: error.message })

}

export async function getProducts(e:H3Event) : Promise<ProductRecord[]> {
     
    /** Peticioon al servidor */
    const supabase = await initClient(e);

     /** Joineamos las relaciones de products */
    const { data , error }=  await supabase
    .from('products')
    .select(`*,
        categories_products(categories(*)),
        rates(*),
        product_images (*)
    `);
    
    /** Control de erores */
    if (error) throw createError({ statusCode: 404, message: error.message })
    
    /** Retornamos valor */
    return data;
}

/** Obtenemos el codigo del producto */
export async function getProduct(s: SupabaseClient, code: string | undefined) : Promise<Product> {
    const { data, error } = await s
        .from('products')
        .select('*')
        .eq('code', code)
        .single();

    if (error) throw createError({ statusCode: 404, message: error.message });

    return data;
}