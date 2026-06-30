# SG-Store · Backoffice

Backoffice de gestión de productos desarrollado como prueba técnica para Studiogenesis.

**Stack:** Nuxt + Supabase 
**Autor:** Gabriel Junior Nivicela Masaco  
**Curso:** CFGS DAW 1r

---

## Acceso al backoffice

| Login  | Valor |
|---|---|
| **Email** | `gabriel@example.com` |
| **Contraseña** | `1234` |


## Funcionalidades

### Categorías
- CRUD completo con jerarquía padre/hija
- Una categoría puede tener subcategorías ilimitadas
- Al eliminar una categoría padre se eliminan sus hijas

### Productos
- CRUD completo con categorías múltiples y tarifas por rango de fechas
- Gestión de imágenes (añadir y eliminar)
- Exportación del listado completo a **XLSX**
- Descarga de ficha individual en **PDF**

### Calendario de pedidos
- Vista mensual con UCalendar 
- Crear una cita indicando producto, fecha y unidades
- El coste se calcula automáticamente según la tarifa vigente del producto
- y formulario de edicion de pedido

## Modulos utilizados

Módulos Instalados
├── @iconify-json/lucide@1.2.111 → Iconos Lucide
├── @internationalized/date@3.12.2 → Manejo de Fechas
├── @nuxt/image@2.0.0 → Nuxtimage
├── @nuxt/ui@4.8.2 → Interfaces fabricadas UI 
├── @nuxtjs/supabase@2.0.9 → Módulo oficial de Supabase para NUXT
├── @exceljs → Exportación csv
├── @pdf-lib → Exportacion PDF
├── @zod → Construcción de Schemas 


