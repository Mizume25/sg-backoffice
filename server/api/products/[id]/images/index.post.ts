/** server/api/products/image.post.ts */
/**
 * Creamos imagenes
 */
export default eventHandler(async (e) => {
  const id = getRouterParam(e, 'id');
  const form = await readMultipartFormData(e);

  if (!id) throw createError({ statusCode: 404, message: 'La id no existe' })
  if (!form) throw createError({ statusCode: 400, message: 'No se recibió ningún dato' });


  const file = form.find((f) => f.name === 'file')
  const path = form.find((f) => f.name === 'path')?.data.toString('utf-8')

  if (!file || !path) throw createError({ statusCode: 400, message: 'Falta el archivo o la ruta' })

  const supabase = await initService(e);
  const product = await getProduct(supabase, id);

  if(!product) throw createError({ statusCode: 404 , message:'No se encuentra el producto'});



  const img: CreateImage = {
    path: path,
    product_id: id
  }


  await createImage(supabase, img, file.data, path, product.code);


  return { ok: true };


});