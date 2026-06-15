import { Category, CategoryRecord, CreateCategory, EditCategory } from "~~/shared/types/definitons";
import { serverSupabaseClient } from '#supabase/server'
import type { H3Event } from 'h3'
import { server } from "typescript";

/** Query para crear Categoria  */
export async function createCategory(cat: CreateCategory, event: H3Event) {

    const supabase = await serverSupabaseClient(event);

    /** Comprobamos que el valor no existe */
    if (await existField(event, cat.name)) throw createError({ statusCode: 409, message: 'El valor ya existe' });

    /** Realizamos el insert */
    const { error } = await supabase
        .from('categories')
        .insert(cat);

    if (error) throw error;



}

/** Query para recoger lista Category */
export async function getCategories(e: H3Event): Promise<CategoryRecord[]> {
    /** Peticion */
    const supabase = await serverSupabaseClient(e);

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

    const supabase = await serverSupabaseClient(e);

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


    const supabase = await serverSupabaseClient(e);

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

    console.log('He recibido los datos', data);

    if (error) throw createError({ statusCode: 409, message: error.message });

}

/** Borrado general de una categoria  */
export async function deleteCategories(e:H3Event , category : CategoryRecord) {
    
  
    if(await existsProducts(e , category.id)) throw createError({statusCode: 409 , message: 'Hay productos asociados'});

    if(category.parent_id == null) {
        const childs = await getChilds(e , category.id);

        childs.forEach((c) => {
            deleteCategory(e ,c.id);
        })
    }


    
    
   

    


}

/*** Borrado especifico de un categoria */
export async function deleteCategory(e:H3Event , id:string)  {

    const supabase = await serverSupabaseClient(e);

    const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

    if(error) throw createError({ statusCode:404 , message:'No se ha encontrado la categoria' });


}


/** Heleper Obtener categorias de padres especificos */
async function getChilds(e:H3Event , id: string) : Promise<Category[]> {

    const supabase = await serverSupabaseClient(e);

    const { data , error } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', id);

    if(error) createError({ statusCode:404 , message:'No se ha encontrado entidades relacionadas'})

    return data ?? [];
    
}

/** Helper para saber si exite o no productos asociados  */
async function existsProducts(e:H3Event , id:string) {
        const supabase = await serverSupabaseClient(e);

    const { data , error } = await supabase
    .from('categories')
    .select(`* , products(*)`)
    .eq('id', id)
    .single();

    if(error) throw createError({statusCode:404 , message:'No existe'});

    return data.products.length != 0;
}


/** Helper para saber si exite un valor o no del campo categories */
async function existField(e: H3Event, name: string): Promise<boolean> {

    const supabase = await serverSupabaseClient(e);

    const { data, error } = await supabase
        .from('categories')
        .select('name')
        .eq('name', name)
        .maybeSingle();

    if (error) throw createError({ statusCode: 404, message: 'Ha habido un error' })

    return data ? true : false;

}