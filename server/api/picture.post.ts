import { findProduct } from "../utils/products";



// server/api/products/image.post.ts
export default eventHandler(async (e) => {
  try {
    const form = await readMultipartFormData(e);

    if (!form) throw createError({ statusCode: 400, message: 'No se recibió ningún dato' });
    

    const file = form.find((f) => f.name === 'file')
    const path = form.find((f) => f.name === 'path')?.data.toString('utf-8')

    if (!file || !path) throw createError({ statusCode: 400, message: 'Falta el archivo o la ruta' })
    

    const supabase = await initService(e);

    const [code, name] = path.split('/');

    const product = await findProduct(supabase, code);

    const img: CreateImage = {
      path: name!,
      product_id: product.id
    }


    await createImage(supabase, img, file.data, name, code);


    return { ok: true };

  } catch (error) {
    console.log(error)
  }
});