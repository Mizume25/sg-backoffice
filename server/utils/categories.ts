import { Category, CategoryRecord, CreateCategory, EditCategory } from "~~/shared/types/definitons";
import type { H3Event } from 'h3'
import { initClient } from "./service";
import { SupabaseClient } from "@supabase/supabase-js";

/** Query para crear Categoria 
 * @param category 
 * @param H3Event
 * 
 * */
export async function createCategory(cat: CreateCategory, s: SupabaseClient) {
    /** Realizamos el insert */
    const { error } = await s
        .from('categories')
        .insert(cat);

    if (error) throw createError({ statusCode: 409, message: error.message });
}

/** Query para recoger lista categories
 * @param H3Event
 * @return categories
 */
export async function getCategories(s: SupabaseClient): Promise<CategoryRecord[]> {


    /** Query */
    const { data, error } = await s
        .from('categories')
        .select(`*, categories(*)`);

    /** Controlamos Errores */
    if (error) throw createError({ statusCode: 404, message: error.message })


    return data;
}

/*** Obtener una Categoria Especifica 
 * 
 * @param SupabaseClient
 * @param category_id
 * @return Category
  */
export async function getCategory(s: SupabaseClient, id: string | undefined): Promise<CategoryRecord> {

    if (!id) throw createError({ statusCode: 404, message: 'Id undefined' })



    /** Obtenemos registros individual */
    const { data, error } = await s
        .from('categories')
        .select(`*, categories(*)`)
        .eq('id', id)
        .single();


    if (error) throw createError({ statusCode: 404, message: error.message })

    return data;
}


/**
 * Actualizar categoria
 * @param H3Event
 * @param categoria_id
 * @param EditCategory
 */
export async function editCategory(s: SupabaseClient, id: string | undefined, edit: EditCategory | undefined) {

    if (!id || !edit) return;

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



    if (error) throw createError({ statusCode: 409, message: error.message });

}

/**
 * Borra Categoria y sus relaciones autoreflexivas
 * @param s SupabaseClient 
 * @param id string | undefined
 */
export async function deleteCategories(s: SupabaseClient, id: string | undefined) {

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
    deleteCategory(s, category.id);



}

/*** Borrado especifico de un categoria */
export async function deleteCategory(s: SupabaseClient, id: string | undefined) {

    if (!id) throw createError({ statusCode: 404, message: 'El id no existe' });



    const { error } = await s
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) throw createError({ statusCode: 500, message: 'Error al eliminar la categoría' });


}


/** Heleper Obtener categorias de padres especificos */
async function getChilds(s: SupabaseClient, id: string): Promise<Category[]> {



    const { data, error } = await s
        .from('categories')
        .select('*')
        .eq('parent_id', id);

    if (error) throw createError({ statusCode: 404, message: 'No se ha encontrado entidades relacionadas' })

    return data ?? [];

}

/** Helper para saber si existe o no productos asociados  */
async function existsProducts(s: SupabaseClient, id: string) {



    const { data, error } = await s

        .from('categories_products')
        .select(`*`)
        .eq('category_id', id)
        .limit(1);




    if (error) throw createError({ statusCode: 500, message: error.message })

    return data && data.length > 0

}

