/** Funciones para crear y subir imagenes */
import type { H3Event } from 'h3'
import { initService } from './service';
import { StoreImageSchema } from '~~/shared/schemas/products/create';



/** Base de datos */

/** Creamos registros y creamos imagen */
export const createImage = async (e: H3Event, img: CreateImage, data: StoreImageSchema, code:string) => {

  const supabase = await initService(e);


  const { error } = await supabase
    .from('product_images')
    .insert(img);

  if (error) throw createError({ statusCode: 409, message: error.message });


  /** Creamos Bucket */
  imageService.create(e, code);


  imageService.upload(e, data.file, data.path , code);

}


/** Subir Imagenes */
export const imageService = {


  async create(e:H3Event , code:string) {

    const supabase = await initService(e);

    await supabase.storage.createBucket(code, { public: true });

  },

  /** Subimos imagen */
  async upload(e: H3Event, file: File | null, path: string , code:string) {

    if(!file) return;
    
    const supabase = await initService(e);

    const { error } = await supabase.storage
      .from(code)
      .upload(path, file);


    if (error) throw createError({ statusCode: 409, message: error.message })


  },
  async rename(e: H3Event, newPath: string, oldPath: string) {

    const supabase = await initService(e);

    const { error } = await supabase.storage
      .from('public')
      .move(oldPath, newPath);

    if (error) throw createError({ statusCode: 409, message: error.message })
  },

  async removes(e: H3Event, path: string[]) {

    const supabase = await initService(e);

    const { error } = await supabase.storage
      .from('public')
      .remove(path)

    if (error) throw createError({ statusCode: 409, message: error.message })
  },

  async remove(e: H3Event, path: string) {

    const supabase = await initService(e);

    const { error } = await supabase.storage
      .from('public')
      .remove([path])

    if (error) throw createError({ statusCode: 409, message: error.message })
  }
};
