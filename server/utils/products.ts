/** Funciones para productos */
import { type StoreProductSchema } from '~~/shared/schemas/products/create'
import { SupabaseClient } from '@supabase/supabase-js';
import { EditProduct, ProductRecord } from '~~/shared/types/definitons';


/** Crea Producto en conjunto a otras entidades
 * @param SupabaseClient
 * @param StoreProductSchema
 * @return ProductRecord
 */
export async function createEntities(s: SupabaseClient, data: StoreProductSchema): Promise<ProductRecord> {
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
    const productRecord = await getProduct(s, product.id);

    return productRecord

}

/**
 * Modificar Producto
 * @param s SupabaseClient
 * @param id string
 * @param product EditProduct
 */
export async function editProduct(s : SupabaseClient , id: string , product: EditProduct) {
    
    const { error }  = await s
    .from('products')
    .update(product)
    .eq('id' , id);

    if(error) throw createError({ statusCode:404 , message: 'No se ha encontrado el producto' , cause:error.message})
    
}

/**
 * Borra Entidades Conjuntas
 * @param SupabaseClient
 * @param id
 */
export async function deleteEntitis(s: SupabaseClient, id: string) {

    const product = await getProduct(s, id);

    /** Eliminamos todaas sus relaciones */
    await Promise.all([
        deleteImages(s, id, product.code),
        deletRates(s, id),
        breakCategories(s, id),
    ])

    /** Eliminamos finalmenete el producto */
    const { error } = await s
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw createError({ statusCode: 404, message: 'No se puedo eliminar producto', cause: error.message });


}


/**
 * Querie para unir categorias
 * @param s SupabaseClient
 * @param productID 
 * @param categories 
 */
async function attachCategories(s: SupabaseClient, productID: string, categories: string[]) {
    const { error } = await s
        .from('categories_products')
        .insert(
            categories.map((id) => ({
                product_id: productID,
                category_id: id
            }))
        )
    if (error) throw createError({ statusCode: 409, message: 'No se pudo conectar ids', cause: error.message })
}


/**
 * Querie para romper categorias
 * @param s SupabaseClient
 * @param id string
 */
async function breakCategories(s: SupabaseClient, id: string) {
    const { error } = await s
        .from('categories_products')
        .delete()
        .eq('product_id', id)

    if (error) throw createError({ statusCode: 404, message: 'No se pudo borrar la relacion', cause: error.message })

}

/**
 * Funcion Crear Producto
 * @param s SupabaseClient
 * @param obj CreateProduct
 * @returns Product
 */
async function createProduct(s: SupabaseClient, obj: CreateProduct): Promise<Product> {
    /** Creamos el producto */
    const product: CreateProduct = { ...obj }

    /** Insertamos el producto */
    const { data, error } = await s
        .from('products')
        .insert(product)
        .select()
        .single();

    if (error) throw createError({ statusCode: 409, message: 'No se pudo crear el producto', cause: error.message })

    return data

}

/**
 * Obtener Lista de productos
 * @param s SupabaseClient
 * @returns Product []
 */
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
    if (error) throw createError({ statusCode: 404, message: 'No se pudo obtener el array de productos', cause:error.message  })

    /** Retornamos valor */
    return data;
}

/**
 * Obtener Producto individual
 * @param s SupabaseClient
 * @param id string
 * @returns ProductRecord
 */
export async function getProduct(s: SupabaseClient, id: string): Promise<ProductRecord> {
    const { data, error } = await s
        .from('products')
        .select(`*,
        categories_products(categories(*)),
        rates(*),
        product_images (*)
    `)
        .eq('id', id)
        .single();

    if (error) throw createError({ statusCode: 404, message: 'No se pudo obtener producto', cause:error.message  });


    return data;


}

/**
 * Modificar Categorias Asociadas
 * @param s Supabase Client
 * @param categories Categorias a modificar
 * @param product_id Producto asociado
 */
export async function changeCategories(s: SupabaseClient, categories: CategoryIDS, product_id: string) {
    
    await breakCategories(s , product_id);


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

   

    // 3. Insertamos todas de golpe
    const { error: insErr } = await s
        .from('categories_products')
        .insert(rows);

    if (insErr) throw createError({ status: 409, message: 'No se pudo insertar los datos' , cause: insErr.message});
}