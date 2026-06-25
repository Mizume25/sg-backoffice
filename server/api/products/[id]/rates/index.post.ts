import { StoreRateSchema } from "~~/shared/schemas/products/create";

/** Endpoint para crear Rate */
export default eventHandler(async (e) => {

    /** Obtenemos id de producto */

    const id = getRouterParam(e , 'id');
    if(!id) throw createError({ statusCode: 404 , message: 'El id no existe'});

    /** Leemos datos */
    const body = await readBody<StoreRateSchema>(e);

    /** Construirmos rate */
    const rate : CreateRate = {...body, product_id: id}

    const supabase = await initClient(e);

    await createRates(supabase, [rate]);
})