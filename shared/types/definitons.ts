/** 
 * @fileoverview Archivo para obtener tipados PostgreSQL de Supabase
 */

/** @import Tipado de el archivo generado con supabase cli */
import { type Database } from "../database.types";


/** Tipos de inserción para las entidades de la base de datos */
export type CreateCategory = Database['public']['Tables']['categories']['Insert']
export type CreateProduct = Database['public']['Tables']['products']['Insert'];
export type CreateRate = Database['public']['Tables']['rates']['Insert'];
export type CreateOrder = Database['public']['Tables']['orders']['Insert'];
export type CreateProfile = Database['public']['Tables']['profiles']['Insert'];
export type CreateImage = Database['public']['Tables']['product_images']['Insert'];



/** Tipos de updates para las entidades de la base de datos */
export type EditCategory = Database['public']['Tables']['categories']['Update']
export type EditProduct = Database['public']['Tables']['products']['Update'];
export type EditRate = Database['public']['Tables']['rates']['Update'];
export type EditOrder = Database['public']['Tables']['orders']['Update'];
export type EditProfile = Database['public']['Tables']['profiles']['Update']
export type EditImage = Database['public']['Tables']['product_images']['Update'];

/** Tipos de returns para las entidades de la base de datos */
export type Category = Database['public']['Tables']['categories']['Row']
export type Product = Database['public']['Tables']['products']['Row'];
export type Rate = Database['public']['Tables']['rates']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Images = Database['public']['Tables']['product_images']['Row']; 
export type Profile = Database['public']['Tables']['profiles']['Row'];




/** 
 * @type Perfil
 */
export type ProfileRecord = Profile & {
    email: string | undefined
}

/** 
 * Producto Completo
 */
export type ProductRecord  = Product & {
   categories_products: { categories: Category | null }[]
  rates: Rate[]
  product_images: Images[]
}

export type ProductsImages = Product & {
    product_images:Images[]
}

/**
 * Order Relacionado
 */
export type OrderRecord = Order & {
    products: ProductsImages
}


export type CategoryRecord = Category & {
    categories: Category[]
}

/** Ids asociados */
export type CategoryIDS = {
    parent: string,
    childs: string[]
}

export type LoginCredentials  = {
    email:string ,
    password: string
}

