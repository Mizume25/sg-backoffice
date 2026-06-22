

/**
 * Retorna el padre 1 producto y su arary de categorias
 * @param record 
 * @returns { string }
 * 
 */
export const getParent = (record: ProductRecord) : string | undefined => {

    const categories = record.categories_products;

    const obj = categories.find((p) => p.categories?.parent_id == null)

        /** En caso de existir  */
    if(obj?.categories){

                /** Guardaremos el valor solo en caso de no estar repetido */
        const parent = obj.categories.name;

        return parent
    } else {

        return undefined
    }
}







