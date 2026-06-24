/** Endpoint para obtener el objeto product */
export default eventHandler(async (e) => {
  const id = getRouterParam(e, 'id');
  if(!id) throw createError({ statusCode: 404 , message:'No se ha encontrado el ID'});
    
  const supabase = await initClient(e);
  const product = await getProduct(supabase, id);
  return product;
})