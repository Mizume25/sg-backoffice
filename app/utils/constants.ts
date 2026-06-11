import type { NavigationMenuItem } from "@nuxt/ui";
/**
 * Objetos exportables para UX  
 */

/** Items de SideBar */
export const SideBarItems: NavigationMenuItem[] = [
    {
        label: "Catalogo de Productos",
        icon: "lucide:house",
        to: "/home/products/",
    },
    {
        label: "Gestion de Categorias",
        icon: "lucide:tag",
        to: "/home/categories/create"
    },
    {
        label: "Añadir Producto",
        icon: "lucide:store",
        to: "/home/products/create"
    },
    {
        label: "Pedir Encargo",
        icon: "lucide:package",
        to: "/home/orders/create"
    }
]

/** Icono dinamicos */
export const iconCategory = (category : string | undefined): string => {
    switch (category) {
        case 'frutas':
            return 'lucide:apple'
        case 'verduras':
            return'lucide:leaf'
        case 'carnes':
            return 'lucide:beef'
        case 'lacteos':
            return 'lucide:milk'
        default:
            return 'lucide:shopping-bag'
    }
}

/** colores dinamicos */
export const colorCategory = (category : string | undefined): string => {
    switch (category) {
        case 'frutas':
            return 'border-yellow-400'
        case 'verduras':
            return'border-green-400'
        case 'carnes':
            return 'border-red-400'
        case 'lacteos':
            return 'border-gray-400'
        default:
            return 'border-black'
    }
}

/**
 * 
 * @function getAllparents
 * @param record
 * @description Obtiene todos los padres de un array de registros
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
 * Funcion que obtiene el padre de 1 producto
 * @function getParent
 * @param record
 * @description Obtenemos la cateogira padre de 1 producto que puede tener varias categorias
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
 * Funcion de Fechas 
 */

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return 'Sin fecha'
  
  const clean = date.split('T')[0] ?? ''
  const parts = clean.split('-')
  
  if (parts.length < 3) return 'Sin fecha'
  
  const [year, month, day] = parts
  return `${day}/${month}/${year?.slice(2)}`
}