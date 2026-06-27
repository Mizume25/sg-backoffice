/** Endpoint para crear ordern */
import { OrderSchema } from '~~/shared/schemas/orders/create';
export default eventHandler(async(e) => {

    const body = await readValidatedBody(e, OrderSchema.parse)

    const supabase = await initClient(e);


    await createOrder(supabase , body);


    return { succes: true }
})