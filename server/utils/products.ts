/** Funciones para productos */
import type { H3Event } from 'h3'
import { type StoreProductSchema } from '~~/shared/schemas/products/create'
import { serverSupabaseClient } from '#supabase/server'
import { CreateProduct, CreateRate } from '~~/shared/types/definitons';
import { createRates } from './rates';


export async function createEntities(e: H3Event, data: StoreProductSchema) {

    /** Creamos el producto */
    const obj: CreateProduct = {
        name: data.name,
        code: data.code,
        description: data.description
    }

    /** Lo insertamos */
    await createProduct(e, obj);

    //** Obtenemos el id de productos */
    const product = await getProduct(e, data.code);



    const rates: CreateRate[] = data.rates.map(rate => ({
        ...rate,
        product_id: product.id
    }));

    /** Creamos las rates */
    await createRates(e, rates);

    /** Relacionamos producto y su categoria */
    await attachCategories(e, product.id, [data.category, data.subcategory]);


    



}


/** Queria para relacionar producto y categoria */
async function attachCategories(e: H3Event, productID: string, categories: string[]) {
    const supabase = await serverSupabaseClient(e);

    const { error } = await supabase
        .from('categories_products')
        .insert(
            categories.map((id) => ({
                product_id: productID,
                category_id: id
            }))
        )

    if(error) throw createError({statusCode: 409 , message: 'No se ha podido crear la relacion'})
}


/** Querie para crear producto */
async function createProduct(e: H3Event, data: CreateProduct) {

    const supabase = await serverSupabaseClient(e);

    /** Creamos el producto */
    const product: CreateProduct = { ...data }

    /** Insertamos el producto */
    const { error } = await supabase
        .from('products')
        .insert(product);

    if (error) throw createError({ statusCode: 409, message: 'Ha habido problemas para añadir el producto' })

}

/** Obtenemos el codigo del producto */
async function getProduct(e: H3Event, code: string) {

    const supabase = await serverSupabaseClient(e);

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('code', code)
        .single();

    if (error) throw createError({ statusCode: 404, message: 'El producto no existe' });

    return data;
}