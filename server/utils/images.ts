/** Funciones para crear y subir imagenes */
import { SupabaseClient } from '@supabase/supabase-js';
import { Images } from '~~/shared/types/definitons';




/** Creamos registros y creamos imagen */
export const createImage = async (client: SupabaseClient, img: CreateImage, file: Buffer, path: string, code: string) => {

  /** Creamos Bucket */
  await imageService.create(client, code);
  await imageService.upload(client, file, path, code, 'application/octet-stream');

  const { error } = await client
    .from('product_images')
    .insert(img);

  if (error) throw createError({ statusCode: 409, message: 'No se pudo insertar imagen', cause: error.message });




}

/** Eliminar todas las imagenes realcionadas */
export const deleteImages = async (s: SupabaseClient, id: string, code: string) => {
  const { data: metadata, error: fetchError } = await s
    .from('product_images')
    .select('path')
    .eq('product_id', id)

  if (fetchError) throw createError({ statusCode: 404, message: 'No se pudo recuperar el registro de imagen', cause: fetchError.message });



  const paths: string[] = metadata?.map(item => item.path) ?? []
  if (paths.length > 0) {
    await imageService.removes(s, code, paths)
  }
  const { error } = await s
    .from('product_images')
    .delete()
    .eq('product_id', id)

  if (error) throw createError({ statusCode: 409, message: 'No se pudo eliminar los registros', cause: error.message });


}

export const deleteImage = async (s: SupabaseClient, id: string | undefined) => {

  const img = await getImageRecord(s, id);
  if (!img) return

  const product = await getProduct(s, img?.product_id);


  /*** Boramos imagenes de buckets */
  await imageService.remove(s, product.code, img?.path);

  /** Eliminamos Registro */
  const { error } = await s
    .from('product_images')
    .delete()
    .eq('id', id)

  /** Saltara error en caso de que no haberse borradoc orectametne */
  if (error) throw createError({ statusCode: 404, message: error.message })


}

export const getImageRecord = async (s: SupabaseClient, id: string | undefined): Promise<Images> => {

  /** Obtenemos metadatos */
  const { data, error } = await s
    .from('product_images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw createError({ statusCode: 404, message: error.message });

  return data;
}






/** Subir Imagenes */
export const imageService = {

  /** Creamos Bucket */
  async create(s: SupabaseClient, code: string) {
    const { data } = await s.storage.getBucket(code);
    if (data) return;

    const { error } = await s.storage.createBucket(code, { public: true });
    if (error) throw createError({ statusCode: 409, message: 'No se pudo crear el bucket', cause: error.message });
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
  },


};
