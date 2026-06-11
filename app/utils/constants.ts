import type { NavigationMenuItem } from "@nuxt/ui";


/** Objetos para UX */

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

/** Icono dinamicos 
 * Obtiene Iconos segun categoria
*/
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

/** Colores dinamicos 
 * Obtiene Iconos segun categoria
*/
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

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return 'Sin fecha'
  
  const clean = date.split('T')[0] ?? ''
  const parts = clean.split('-')
  
  if (parts.length < 3) return 'Sin fecha'
  
  const [year, month, day] = parts
  return `${day}/${month}/${year?.slice(2)}`
}

