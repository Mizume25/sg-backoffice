import { ProductRecord } from "~~/shared/types/definitons";

/** Endpoint para obtener el objeto product */
export default eventHandler(async (e) => {
    try {
        const id = getRouterParam(e, 'id');
        const product = await getProduct(e, id);

        return product;

    } catch (error) {
        console.log(error)
    }
})