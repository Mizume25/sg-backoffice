import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Querie para crear categoria
 * @param cat CreateCategory
 * @param s SupabaseClient
 */
export async function createCategory(cat: CreateCategory, s: SupabaseClient) {
    /** Realizamos el insert */
    const { error } = await s
        .from('categories')
        .insert(cat);

    if (error) throw createError({ statusCode: 409, message: 'Error al crear categorías', cause: error.message });
}

/**
 * Metodo para obtener lista de categorias
 * @param s SupabaseClient 
 * @returns CategoryRecord []
 */
export async function getCategories(s: SupabaseClient): Promise<CategoryRecord[]> {
    /** Query */
    const { data, error } = await s.from('categories').select(`*, categories(*)`);

    /** Controlamos Errores */
    if (error) throw createError({ statusCode: 500, message: 'No se ha encontrado las categorias', cause: error.message })

    return data;
}

/**
 * Creo una funcion que obtenega una categoria
 * @param s SupabaseClient
 * @param id string
 * @returns CategoryRecord
 */
export async function getCategory(s: SupabaseClient, id: string): Promise<CategoryRecord> {
    /** Obtenemos registros individual */
    const { data, error } = await s
        .from('categories')
        .select(`*, categories(*)`)
        .eq('id', id)
        .single();
    if (error) throw createError({ statusCode: 404, message: 'No se ha encontrado la categoria', cause: error.message })
    return data;
}


/**
 * EditarCategory
 * @param s SupabaseClient
 * @param id string
 * @param edit EdiCategory
 */
export async function editCategory(s: SupabaseClient, id: string, edit: EditCategory) {
    /** Consulta */
    const { error } = await s
        .from('categories')
        .update({
            name: edit.name,
            code: edit.code,
            description: edit.description,
            parent_id: edit.parent_id
        })
        .eq('id', id);
    if (error) throw createError({ statusCode: 409, message: error.message, cause: error.message });

}

/**
 * Borra Categoria y sus relaciones autoreflexivas
 * @param s SupabaseClient 
 * @param id string | undefined
 */
export async function deleteCategories(s: SupabaseClient, id: string) {

    /** Obtenmos Categoria */
    const category = await getCategory(s, id);

    /** Si exite productos asociados dara erorr */
    if (await existsProducts(s, category.id)) throw createError({ statusCode: 409, message: 'Hay productos asociados' });

    /** Si exite productos asociados sus categoiras tambien dara error */
    if (category.parent_id == null && category.categories.length != 0) {

        for (const c of category.categories) {

            if (await existsProducts(s, c.id)) throw createError({ statusCode: 409, message: 'Hay productos asociados' })
        }

        await Promise.all(category.categories.map((c) => deleteCategory(s, c.id)))


    }

    /** Borramos finalmente la categoria */
    await deleteCategory(s, category.id);
}

/**
 * Querie para borrar categoria
 * @param s SupabaseClient
 * @param id string
 */
export async function deleteCategory(s: SupabaseClient, id: string) {
    const { error } = await s
        .from('categories')
        .delete()
        .eq('id', id);
    if (error) throw createError({ statusCode: 500, message: 'Error al eliminar la categoría', cause: error.message });
}


/**
 * Querie para comprobar si existe producto
 * @param s SupabaseClient
 * @param id string
 */
async function existsProducts(s: SupabaseClient, id: string) {
    const { data, error } = await s
        .from('categories_products')
        .select(`*`)
        .eq('category_id', id)
        .limit(1);
    if (error) throw createError({ statusCode: 500, message: 'No se ha encontrado el producto', cause: error.message })

    return data && data.length > 0
}

