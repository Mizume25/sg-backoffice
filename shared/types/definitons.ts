/** 
 * @types Tipado de los contenidos de la APP
 */
import { type Database } from "./database.types";


/** Export types  - Crear */
export type CreateCategory = Database['public']['Tables']['categories']['Insert']
export type CreateProduct = Database['public']['Tables']['products']['Insert'];
export type CreateRate = Database['public']['Tables']['rates']['Insert'];
export type CreateOrder = Database['public']['Tables']['categories']['Insert'];
export type CreateProfile = Database['public']['Tables']['profiles']['Insert'];


/** Objetos para - Editar */
export type EditCategory = Database['public']['Tables']['categories']['Update']
export type EditProduct = Database['public']['Tables']['products']['Update'];
export type EditRate = Database['public']['Tables']['rates']['Update'];
export type EditOrder = Database['public']['Tables']['categories']['Update'];
export type EditProfile = Database['public']['Tables']['profiles']['Update']

/** Export types - Objetos que retorna */
export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row'];
export type Rate = Database['public']['Tables']['rates']['Row'];
export type Order = Database['public']['Tables']['categories']['Row'];
export type Images = Database['public']['Tables']['product_images']['Row']; 
export type Profile = Database['public']['Tables']['profiles']['Row'];

/** Export Profile */
export type User = Profile & {
    email: string | undefined
}

/** Exportamos datos especificados */
export type ProductRecord  = Product & {
   categories_products: { categories: Category | null }[]
  rates: Rate[]
  product_images: Images[]
}



