/** Funciones para productos */
import { type StoreProductSchema } from '~~/shared/schemas/products/create'
import { SupabaseClient } from '@supabase/supabase-js';
import { ProductRecord } from '~~/shared/types/definitons';


/** Crea Producto en conjunto a otras entidades
 * @param SupabaseClient
 * @param StoreProductSchema
 * @return 
 */
export async function createEntities(s: SupabaseClient, data: StoreProductSchema) : Promise<ProductRecord> {


    const obj: CreateProduct = {
        name: data.name,
        code: data.code,
        description: data.description,
    }

    /** Obtenemos producto resultante  */
    const product = await createProduct(s, obj)
    
    /** Copiamos los valores de rates */
    const rates: CreateRate[] = data.rates.map(rate => ({
        ...rate,
        product_id: product.id,
    }))

    /** Creamos rates y unimos categorias */
    await Promise.all([
        createRates(s, rates),
        attachCategories(s, product.id, [data.category, data.subcategory]),
    ])

    /** Obtenemos producto con valores creados */
    const productRecord = await getProduct(s , product.id);

    return productRecord

}

/**
 * Borra Entidades Conjuntas
 * @param SupabaseClient
 * @param id
 */
export async function deleteEntitis(s: SupabaseClient, id: string | undefined) {

    if (!id) throw createError({ statusCode: 404, message: 'La id no existe' })

    const product = await getProduct(s, id);

    /** Eliminamos todaas sus relaciones */
    await Promise.all([
        deleteImages(s, id, product.code),
        deletRates(s, id),
        breakCategories(s, id),
    ])

    /** Eliminamos finalmenete el producto */
    const { error } = await s
        .from('product')
        .delete()
        .eq('id', id);

    if (error) throw createError({ statusCode: 404, message: error.message });


}


/** Queria para relacionar producto y categoria */
async function attachCategories(s: SupabaseClient, productID: string, categories: string[]) {


    const { error } = await s
        .from('categories_products')
        .insert(
            categories.map((id) => ({
                product_id: productID,
                category_id: id
            }))
        )

    if (error) throw createError({ statusCode: 409, message: error.message })
}


/** Querie para borrar relacion de producto con categories */
async function breakCategories(s: SupabaseClient, id: string) {

    const { error } = await s
        .from('categories_products')
        .delete()
        .eq('product_id', id)

    if (error) throw createError({ statusCode: 404, message: error.message })

}


/** Querie para crear producto */
async function createProduct(s: SupabaseClient, obj: CreateProduct) : Promise<Product> {
    /** Creamos el producto */
    const product: CreateProduct = { ...obj }

    /** Insertamos el producto */
    const { data , error } = await s
        .from('products')
        .insert(product)
        .select()
        .single();

    if (error) throw createError({ statusCode: 409, message: error.message })

    return data

}

export async function getProducts(s: SupabaseClient): Promise<ProductRecord[]> {

    /** Joineamos las relaciones de products */
    const { data, error } = await s
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


export async function getProduct(s: SupabaseClient, id: string | undefined): Promise<ProductRecord> {

    if (!id) throw createError({ statusCode: 409, message: 'El id no existe' });




    const { data, error } = await s
        .from('products')
        .select(`*,
        categories_products(categories(*)),
        rates(*),
        product_images (*)
    `)
        .eq('id', id)
        .single();

    if (error) throw createError({ statusCode: 404, message: error.message });


    return data;


}

/** Obtenemos el codigo del producto */
export async function findProduct(s: SupabaseClient, code: string | undefined): Promise<Product> {
    const { data, error } = await s
        .from('products')
        .select('*')
        .eq('code', code)
        .single();

    if (error) throw createError({ statusCode: 404, message: error.message });

    return data;
}

/** Obtenemos el codigo del producto */
export async function fetchProduct(s: SupabaseClient, id: string | undefined): Promise<Product> {
    const { data, error } = await s
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw createError({ statusCode: 404, message: error.message });

    return data;
}

/** Modificar categorias asociadas */
export async function changeCategories(s: SupabaseClient, categories: CategoryIDS, product_id: string) {


    // 1. Borramos todas las relaciones actuales del producto
    const { error: delErr } = await s
        .from('categories_products')
        .delete()
        .eq('product_id', product_id);

    if (delErr) throw createError({ status: 404, message: delErr.message });


    // Re modificamos campos
    const rows = [
        {
            product_id: product_id,
            category_id: categories.parent
        },
        ...categories.childs.map(id => ({
            product_id: product_id,
            category_id: id
        }))
    ];

    console.log('rows a insertar:', rows)
    console.log('body recibido:', categories)

    // 3. Insertamos todas de golpe
    const { error: insErr } = await s
        .from('categories_products')
        .insert(rows);

    if (insErr) throw createError({ status: 409, message: insErr.message });
}