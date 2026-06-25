import { editProduct } from "~~/server/utils/products";

/** Endpoint Editar Producto */
export default eventHandler(async(e) =>  {

    /** Leemos id de Producto */
    const id = getRouterParam(e , 'id');

    if(!id) throw createError({ statusCode: 404 , message: 'El id no existe'});

    /** Leemos body */
    const body = await readBody(e);

    const supabase = await initService(e)

    await editProduct(supabase , id , body);


    return { succes: true }

})