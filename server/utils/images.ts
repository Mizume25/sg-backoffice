/** Funciones para crear y subir imagenes */
import { SupabaseClient } from '@supabase/supabase-js';



/** Base de datos */

/** Creamos registros y creamos imagen */
export const createImage = async (client: SupabaseClient, img: CreateImage, file: Buffer, path: string | undefined, code: string | undefined) => {
  if (!code || !path) return

  const { error } = await client
    .from('product_images')
    .insert(img);

  if (error) throw createError({ statusCode: 409, message: error.message });


  /** Creamos Bucket */
  await Promise.all([
    imageService.create(client, code),
    imageService.upload(client, file, path, code, 'application/octet-stream'),
  ])

}


export const deleteImage = async (s: SupabaseClient, id: string, code: string) => {
  const { data, error } = await s
    .from('product_images')
    .select('path')
    .eq('product_id', id)

  if (error) createError({ statusCode: 404, message: error.message });


  if (data!.length > 1) {
    const paths: string[] = data?.map(item => item.path) ?? []
    await imageService.removes(s, code, paths)
  } else {
    const path: string = data![0]?.path ?? null;

    await imageService.remove(s, code, path)
  }





}


/** Subir Imagenes */
export const imageService = {

  /** Creamos Bucket */
  async create(s: SupabaseClient, code: string) {
    await s.storage.createBucket(code, { public: true });

  },

  /** Subimos imagen */
  async upload(s: SupabaseClient, file: Buffer, path: string, code: string, contentType: string) {
    if (!file) return;

    const { error } = await s.storage.from(code).upload(path, file, { contentType, upsert: true });

    if (error) throw createError({ statusCode: 409, message: error.message })


  },

  /** Rescribimso bucket */
  async rename(s: SupabaseClient, newPath: string, oldPath: string) {

    const { error } = await s.storage
      .from('public')
      .move(oldPath, newPath);

    if (error) throw createError({ statusCode: 409, message: error.message })
  },

  /*** Borrammos varias imagenes */
  async removes(s: SupabaseClient, code: string, names: string[]) {

    const { error } = await s.storage.from(code).remove(names)

    if (error) throw createError({ statusCode: 409, message: error.message })
  },

  /** Borramos solo una */
  async remove(s: SupabaseClient, code: string, name: string) {

    const { error } = await s.storage.from(code).remove([name])

    if (error) throw createError({ statusCode: 409, message: error.message })
  }
};
