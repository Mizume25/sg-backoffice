import type { NavigationMenuItem } from "@nuxt/ui";
/**
 * Objetos exportables para UX  
 */

/** Items de SideBar */
export const SideBarItems: NavigationMenuItem[] = [
    {
        label: "Catalogo de Productos",
        icon: "lucide:house",
        to: "#"
    },
    {
        label: "Gestion de Categorias",
        icon: "lucide:tag",
        to: "#"
    },
    {
        label: "Añadir Producto",
        icon: "lucide:store",
        to: "#"
    },
    {
        label: "Pedir Encargo",
        icon: "lucide:package",
        to: "#"
    }
]