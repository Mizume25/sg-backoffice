import { deleteImage } from "~~/server/utils/images";
import { deletRate } from "~~/server/utils/rates";

/** Endpoint para poder eliminar productos */
export default eventHandler(async(e) => {

    
    const id = getRouterParam(e , 'id');


    await deleteEntitis(e , id);

})