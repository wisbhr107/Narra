# Narra — Crónicas, memorias y cuadernos personales

Narra es una aplicación web artesanal para escribir, organizar y leer historias y diarios personales. Diseñada con una estética editorial cálida de vitela, papel pautado y tipografías literarias (*Merriweather* y *Plus Jakarta Sans*).

---

## 🚀 Instalación y ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 👥 Cuentas de demostración

El sistema incluye autenticación simulada persistida en `localStorage` con dos perfiles de prueba:

| Rol | Correo | Contraseña | Acceso |
|---|---|---|---|
| **Administrador** | `admin@narra.com` | `admin12345` | Acceso total, incluyendo `/admin/categorias` |
| **Cronista / Autor** | `cronista@narra.es` | `tinta12345` | Mis historias y Editor personal |

---

## 📖 Pantallas y Rutas del Proyecto

- `/` — **Inicio**: Catálogo público con buscador en vivo, filtrado por chips y botón para desplegar más historias.
- `/login` — **Iniciar sesión**: Formulario de acceso con alerta de credenciales no coincidentes.
- `/registro` — **Crear cuenta**: Formulario con validación de correo y contraseña (mínimo 8 caracteres).
- `/mis-historias` — **Mis historias** *(Ruta protegida)*: Barra lateral artesanal, filtros por categoría/etiqueta/orden, alternador de vista cuadrícula/lista y opciones para editar y eliminar crónicas.
- `/editor/:id` — **Editor de Manuscrito** *(Ruta protegida)*: Hoja de papel pautado editable con `contentEditable`, contador de palabras en tiempo real, pestañas laterales deslizables con CSS puro (Apariencia, Pegatinas, Imágenes, Texto), botón Guardar con animación de estado y pluma flotante con Asistente de Escritura.
- `/historia/:id` — **Lectura**: Vista de libro con barra superior de progreso vinculada al scroll, índice interactivo de capítulos y botones anterior/siguiente.
- `/admin/categorias` — **Gestión de categorías** *(Solo Administrador)*: Tabla para crear, renombrar y eliminar categorías, con diálogo de bloqueo para categorías que tienen historias asignadas.
