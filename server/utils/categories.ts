import { CategoryRecord, CreateCategory } from "~~/shared/types/definitons";
import { serverSupabaseClient } from '#supabase/server'
import type { H3Event } from 'h3'
import { server } from "typescript";

/** Query para crear Categoria  */
export async function createCategory(cat: CreateCategory, event: H3Event): Promise<void> {

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
export async function getCategories(e: H3Event) : Promise<CategoryRecord[]> {
     /** Peticion */
    const supabase = await serverSupabaseClient(e);

    /** Query */
    const { data , error } = await supabase
    .from('categories')
    .select(`*, categories(*)`);

    /** Controlamos Errores */
    if(error) throw createError({ statusCode:404 , message:error.message})

    
    return data;
}

/*** Obtneer una categoria especifica  */
export async function getCategory(e:H3Event , id: string | undefined) : Promise<CategoryRecord> {

     if(!id) throw createError({ statusCode: 404 , message: 'Id undefined'})
    
    const supabase = await serverSupabaseClient(e);

    /** Obtenemos registros individual */
    const { data , error } = await supabase
    .from('categories')
    .select(`*, categories(*)`)
    .eq('id', id)
    .single();


    if(error) throw createError({ statusCode: 404 , message: error.message})

    return data;
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