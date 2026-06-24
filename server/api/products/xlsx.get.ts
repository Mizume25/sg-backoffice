/** Endpoint para obtener la lista de productos formato xlsx */
import ExcelJS from 'exceljs'


/** Endpoint para pbtener lista de datos */
export default eventHandler(async (e) => {

  const supabase = await initClient(e);

  /** Obtenemos producto */
  const products = await getProducts(supabase)

  /** Creamos el objeto excel */
  const excel = new ExcelJS.Workbook()

  /** Abrimos un espacio de trabajo */
  const page = excel.addWorksheet('Products')

  /** Creamos columnas */
  page.columns = [
    { header: 'Nombre', key: 'name', width: 30 },
    { header: 'Codigo', key: 'code', width: 20 },
    { header: 'Descripcion', key: 'description', width: 40 },
    { header: 'Categorias', key: 'categories', width: 30 },
    { header: 'Tarifas', key: 'rates', width: 30 },
    { header: 'Imagenes', key: 'images', width: 30 }
  ]


  /** Iteramos los objetos  */
  for (const p of products) {
    page.addRow({
      name: p.name,
      code: p.code,
      description: p.description,
      categories: (p.categories_products)
        .map((cp) => cp.categories?.code)
        .filter(Boolean)
        .join(', '),

      rates: (p.rates)
        .map((r) => {
          const fecha = r.end_date
            ? new Date(r.end_date).toLocaleDateString('es-ES')
            : 'sin fecha'
          return `${r.price}€ (${fecha})`
        })
        .join(' | '),

      images: (p.product_images)
        .map((img) => img.path)
        .filter(Boolean)
        .join(', ')
    })
  }

  const buffer = await excel.xlsx.writeBuffer()

  setHeader(e, 'Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  setHeader(e, 'Content-Disposition', 'attachment; filename="productos.xlsx"')
  return buffer
})