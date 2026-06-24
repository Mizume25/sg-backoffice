import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
/** Obtenemos PDF Maquetado */
export default eventHandler(async (e) => {

    /** Obtenemos id */
    const id = getRouterParam(e, 'id');
    const producto = await getProduct(e, id)

    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    let page = pdfDoc.addPage([595, 842])
    let y = page.getSize().height - 50



    /*** Lineas de producto  */
    const linea = (texto: string, opts: { size?: number; bold?: boolean } = {}) => {

        const size = opts.size ?? 12

        if (y < 50) {                       // se acabó la página
            page = pdfDoc.addPage([595, 842])
            y = page.getSize().height - 50
        }
        page.drawText(texto, {
            x: 50,
            y,
            size,
            font: opts.bold ? fontBold : font,
            color: rgb(0.1, 0.1, 0.1)
        })
        y -= size + 8
    }

    // ---- Título ----
    linea('Ficha Técnica', { size: 20, bold: true })
    y -= 10

    // ---- Datos básicos Nombre y Codigo ----
    linea(`Nombre: ${producto.name ?? ''}`)
    linea(`Código: ${producto.code ?? ''}`)


    /** Categorias */
    if (producto.categories_products?.length) {
        y -= 10
        linea('Categorías', { size: 14, bold: true })
        for (const cp of producto.categories_products) {
            const cat = cp.categories
            linea(`• ${cat?.code ?? ''} (${cat?.id ?? ''})`)
        }
    }

    /** Rates */
    if (producto.rates?.length) {
        y -= 10
        linea('Precios', { size: 14, bold: true })
        for (const r of producto.rates) {
            const fecha = r.end_date ? new Date(r.end_date).toLocaleDateString('es-ES') : 'sin fecha'
            linea(`• ${r.price} € — hasta ${fecha}`)
        }
    }

    /** Imagenes  */
    if (producto.product_images?.length) {
        y -= 10
        linea('Imágenes', { size: 14, bold: true })
        for (const img of producto.product_images) {
            linea(`• ${img.path ?? ''}`)
        }
    }

    const pdfBytes = await pdfDoc.save()
    setHeader(e, 'Content-Type', 'application/pdf')
    setHeader(e, 'Content-Disposition', `attachment; filename="producto-${id}.pdf"`)

    return send(e, Buffer.from(pdfBytes))
})