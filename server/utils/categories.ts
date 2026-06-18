import { Category, CategoryRecord, CreateCategory, EditCategory } from "~~/shared/types/definitons";
import type { H3Event } from 'h3'
import { initClient } from "./service";

/** Query para crear Categoria  */
export async function createCategory(cat: CreateCategory, e: H3Event) {

    const supabase = await initClient(e);

    /** Comprobamos que el valor no existe */
    if (await existField(e, cat.name)) throw createError({ statusCode: 409, message: 'El valor ya existe' });

    /** Realizamos el insert */
    const { error } = await supabase
        .from('categories')
        .insert(cat);

    if (error) throw error;



}

/** Query para recoger lista Category */
export async function getCategories(e: H3Event): Promise<CategoryRecord[]> {
    /** Peticion */
    const supabase = await initClient(e);

    /** Query */
    const { data, error } = await supabase
        .from('categories')
        .select(`*, categories(*)`);

    /** Controlamos Errores */
    if (error) throw createError({ statusCode: 404, message: error.message })


    return data;
}

/*** Obtneer una categoria especifica  */
export async function getCategory(e: H3Event, id: string | undefined): Promise<CategoryRecord> {

    if (!id) throw createError({ statusCode: 404, message: 'Id undefined' })

    const supabase = await initClient(e);

    /** Obtenemos registros individual */
    const { data, error } = await supabase
        .from('categories')
        .select(`*, categories(*)`)
        .eq('id', id)
        .single();


    if (error) throw createError({ statusCode: 404, message: error.message })

    return data;
}


/** Aztualizar categoria */
export async function editCategory(e: H3Event, id: string | undefined, edit: EditCategory | undefined) {

    if (!id || !edit) return;


    const supabase = await initClient(e);

    /** Consulta */
    const { data, error } = await supabase
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

/** Borrado general de una categoria  */
export async function deleteCategories(e: H3Event, category: CategoryRecord) {
   
    /** Si exite productosasociados dara erorr */
    if (await existsProducts(e, category.id)) throw createError({ statusCode: 409, message: 'Hay productos asociados' });

    /** Si exite productos asociados sus categoiras tambien dara error */
    if (category.parent_id == null && category.categories.length != 0) {

        for (const c of category.categories) {

            if (await existsProducts(e, c.id)) throw createError({ statusCode: 409, message: 'Hay productos asociados' })
        }
        
        await Promise.all(category.categories.map(c => deleteCategory(e, c.id)))

         
    }

    /** Borramos finalmente la categoria */
    deleteCategory(e, category.id);

    

}

/*** Borrado especifico de un categoria */
export async function deleteCategory(e: H3Event, id: string | undefined) {

    if(!id) throw createError({ statusCode: 404 , message:'El id no existe'});

    const supabase = await initClient(e);

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) throw createError({ statusCode: 500, message: 'Error al eliminar la categoría' });


}


/** Heleper Obtener categorias de padres especificos */
async function getChilds(e: H3Event, id: string): Promise<Category[]> {

    const supabase = await initClient(e);

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', id);

    if (error) createError({ statusCode: 404, message: 'No se ha encontrado entidades relacionadas' })

    return data ?? [];

}

/** Helper para saber si existe o no productos asociados  */
async function existsProducts(e: H3Event, id: string) {

    const supabase = await initClient(e);

    const { data, error } = await supabase

        .from('categories_products')
        .select(`*`)
        .eq('category_id', id)
        .limit(1);




    if (error) throw createError({ statusCode: 500, message: error.message })

    return data && data.length > 0

}


/** Helper para saber si exite un valor o no del campo categories */
async function existField(e: H3Event, name: string): Promise<boolean> {

    const supabase = await initClient(e);

    const { data, error } = await supabase
        .from('categories')
        .select('name')
        .eq('name', name)
        .maybeSingle();

    if (error) throw createError({ statusCode: 404, message: 'Ha habido un error' })

    return data ? true : false;

}