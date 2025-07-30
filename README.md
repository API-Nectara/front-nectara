# 🦋 Nectara - Cuaderno de Campo Digital

> *Conservando las mariposas de África*

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 📖 Descripción del Proyecto

**Nectara** es un cuaderno de campo digital interactivo diseñado para documentar y conservar las mariposas de África.

Los polinizadores son indicadores fundamentales de la salud ambiental, y su documentación sistemática es crucial para la conservación de los ecosistemas africanos. Nectara permite a investigadores, estudiantes y entusiastas de la naturaleza crear un registro completo de las especies de mariposas encontradas en el continente africano.

Las poblaciones de polinizadores han disminuido drásticamente en las últimas décadas debido a:
- 🌡️ **Cambio climático**
- 🧪 **Uso de pesticidas**
- 🏗️ **Pérdida de hábitats**
- 🏭 **Contaminación ambiental**

Nectara contribuye a la **observación ciudadana** y la **digitalización del conocimiento natural**, pilares clave en los esfuerzos de conservación actuales.

## ✨ Características Principales

### 🔍 Gestión Completa de Especies
- **Crear** nuevos registros de mariposas con información detallada
- **Visualizar** especies en una galería interactiva
- **Editar** información científica y descriptiva
- **Eliminar** registros obsoletos o duplicados

### 📱 Experiencia de Usuario
- **Diseño responsivo** optimizado para todos los dispositivos
- **Interfaz intuitiva** inspirada en cuadernos de campo tradicionales
- **Navegación fluida** entre especies con efecto de libro físico
- **Formularios inteligentes** con validación en tiempo real

### 🎨 Características Técnicas
- **Subida de imágenes** integrada con Cloudinary
- **Búsqueda y filtrado** de especies
- **Datos científicos completos** (taxonomía, hábitat, comportamiento migratorio)
- **Breadcrumb navigation** para orientación clara

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca principal de UI
- **React Router v6.4+** - Enrutado con `createBrowserRouter`
- **Tailwind CSS** - Framework de estilos utilitarios
- **Vite** - Herramienta de desarrollo y build
- **Lucide React** - Iconografía moderna
- **Three** - Objetos 3D

### Backend y Datos
- **JSON Server** - API simulada para desarrollo
- **Axios** - Cliente HTTP para peticiones al servidor
- **Cloudinary** - Gestión y optimización de imágenes

### Herramientas de Desarrollo
- **React Hook Form** - Manejo eficiente de formularios
- **Vitest** - Framework de testing
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js
- npm 

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/angiepereir/nectara.git
cd nectara
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

4. **Iniciar el servidor de desarrollo**
```bash
# Terminal 1: Servidor JSON
npm run api-fake

# Terminal 2: Aplicación React
npm run dev
```

5. **Acceder a la aplicación**
- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
nectara/
├── public/
│   ├── images-home/          # Imágenes estáticas
│   └── image4.jpg           # Fondo principal
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── Navbar.jsx      # Navegación principal
│   ├── layout/             # Layouts de la aplicación
│   │   └── Layout.jsx      # Layout principal
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.jsx        # Página de inicio
│   │   ├── Init.jsx        # Dashboard principal
│   │   ├── CreateButterfly.jsx    # Crear nueva especie
│   │   ├── ButterflyDetail.jsx    # Detalle de especie
│   │   ├── ButterflyGalery.jsx    # Galería de especies
│   │   ├── EditButterfly.jsx      # Editar especie
│   │   ├── Contact.jsx     # Página de contacto
│   │   └── AboutUs.jsx     # Acerca de nosotros
│   ├── services/           # Servicios de API
│   │   └── ButterflyServices.js   # CRUD operations
│   ├── router/             # Configuración de rutas
│   │   └── index.jsx       # Router principal
│   └── main.jsx           # Punto de entrada
├── server/
│   └── db.json            # Base de datos simulada
└── package.json
```

## 🎯 Funcionalidades Implementadas

### ✅ Operaciones CRUD Completas
- [x] **GET** - Listar todas las mariposas
- [x] **GET** - Obtener detalles de una mariposa específica
- [x] **POST** - Crear nueva especie
- [x] **PUT** - Actualizar información de especie
- [x] **DELETE** - Eliminar especie

### ✅ Características Avanzadas
- [x] Subida de imágenes a Cloudinary
- [x] Validación de formularios con React Hook Form
- [x] Diseño responsivo completo
- [x] Navegación tipo libro físico
- [x] Breadcrumb navigation
- [x] Drag & drop para imágenes
- [x] Estados de carga y error

## 🎨 Diseño y UX

Nectara presenta un diseño inspirado en cuadernos de campo científicos tradicionales:

- **Paleta de colores** tierra y naturales
- **Tipografía** Georgia serif para un aspecto académico
- **Efectos visuales** que simulan páginas de libro
- **Gradientes** sutiles que evocan paisajes africanos
- **Responsive design** que se adapta a cualquier dispositivo

## 🧪 Testing

```bash
# Ejecutar tests
npm run test


## 📚 Recursos y Referencias

- [EU Pollinators Initiative](https://ec.europa.eu/environment/nature/conservation/species/pollinators/index_en.htm)
- [¿Por qué están desapareciendo las mariposas? - National Geographic](https://www.nationalgeographic.es/animales/2019/03/por-que-estan-desapareciendo-las-mariposas)
- [Pacto Verde Europeo](https://ec.europa.eu/info/strategy/priorities-2019-2024/european-green-deal_es)
- [Estrategia de Biodiversidad 2030](https://ec.europa.eu/environment/strategy/biodiversity-strategy-2030_es)



---

**Nectara** - *Porque cada mariposa cuenta en la historia de la conservación* 🦋

