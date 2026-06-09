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