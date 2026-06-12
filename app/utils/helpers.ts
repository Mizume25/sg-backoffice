/**
 * Devuelve todos las categorias padres de 1 array de records
 * @param records 
 * @returns {string []}
 */
export const getAllParents = (records: ProductRecord[]): string[] => {

    if(records == null) return [];

    const parents : string [] | undefined = [];

    /** Recoremos cada Producto */
    records.forEach((product) => {
        
        /** Reutilizamos funcion indivudual */
        const parent = getParent(product)

        /** En caso de existir  */
        if(parent){
            if(!parents.includes(parent)) parents.push(parent)
        }

    });


    return parents;

    
}


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

/**
 * 
 * Retorna la id de una categoria a a partir del nombre
 * @param {CategoryRecord [] string}
 * @return uuid
 */
export const getCategoryID = (records: CategoryRecord[], name: string | undefined): string | null => {
  if (!records) return null;
  return records.find((p) => p.name === name)?.id ?? null;
  //                                           ^^^ optional chaining directo
}



