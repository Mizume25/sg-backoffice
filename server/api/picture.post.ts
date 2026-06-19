// server/api/products/image.post.ts
export default eventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({ statusCode: 400, message: 'No se recibió ningún dato' });
  }

  const fileField = form.find((f) => f.name === 'file');



  // log temporal para verificar que llega todo
  console.log('archivo:', fileField?.filename, fileField?.type, fileField?.data.length);


  return { ok: true };
});