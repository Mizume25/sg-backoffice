/** 
 * @types Tipado de los contenidos de la APP
 */
import { type Database } from "./database.types";

/** Export types */
export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Rate = Database['public']['Tables']['rates']['Row'];
export type Order = Database['public']['Tables']['categories']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

/** Export Profile */
export type User = Profile & {
    email: string | undefined
}


