import { StoreProductSchema } from "~~/shared/schemas/products/create";

/** Endpoint para crear un Producto */
export default eventHandler(async (e) => {

    const body = await readBody(e);

    try {

        
        await createEntities(e , body);
    } catch (error : any) {
        console.log(error)
        throw createError({ statusCode: 409 , message:error });
        
    }




})