# 🦋 NECTARA – Mariposas de África

NECTARA es una aplicación **frontend en React (Vite)** creada con fines educativos.  
El proyecto busca difundir el conocimiento sobre **mariposas africanas** y, al mismo tiempo, practicar el consumo de **APIs REST** implementando operaciones **CRUD** (`GET`, `POST`, `PUT`, `DELETE`).  

---

## 🚀 Tecnologías utilizadas
- **React + Vite**
- **Axios** (peticiones HTTP)
- **React Router** (navegación)
- **CSS** (estilos)
- **Jest / Testing Library** (tests)

---

## 📂 Estructura del proyecto
src/
├── api # Funciones para consumir la API (GET, POST, PUT, DELETE)
├── assets # Imágenes y recursos estáticos
├── canvas # Vista principal tipo "lienzo"
├── components # Componentes reutilizables
├── layout # Estructura de la aplicación
├── pages # Páginas principales
├── router # Configuración de rutas
├── services # Servicios (CRUD de mariposas)
├── tests # Tests unitarios
├── index.css # Estilos globales
└── main.jsx # Punto de entrada del frontend


## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/nectara.git
cd nectara
2️⃣ Instalar dependencias
bash
Copiar código
npm install
3️⃣ Configurar variables de entorno
En este frontend usamos Vite, por lo que las variables deben declararse en un archivo .env o .env.local.

Ejemplo:

env
Copiar código
VITE_API_URL=http://localhost:4000/api/butterflies
VITE_API_URL → URL del backend que provee los datos (puede ser un servidor con Sequelize/MySQL/Postgres o con MongoDB).

Esto permite conectar fácilmente el frontend con distintos backends.

4️⃣ Ejecutar el proyecto
bash
Copiar código
npm run dev
La aplicación estará disponible en: http://localhost:5173

🛠 Scripts disponibles
npm run dev → Levanta el frontend en modo desarrollo

npm run test → Ejecuta los tests del proyecto

🐛 CRUD implementado
El frontend está preparado para interactuar con un backend REST:

GET → Obtener todas las mariposas o una por ID

POST → Crear una nueva mariposa

PUT → Actualizar una mariposa existente

DELETE → Eliminar una mariposa

Ejemplo con Axios:

js
Copiar código
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET todas las mariposas
export const getButterflies = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

// POST nueva mariposa
export const createButterfly = async (data) => {
  const res = await axios.post(`${API_URL}`, data);
  return res.data;
};
💡 Recomendaciones
Para usar este frontend, asegúrate de tener un backend funcionando que exponga los endpoints /api/butterflies.

Puedes conectar el proyecto a un backend con Sequelize (SQL) o con MongoDB, modificando la variable VITE_API_URL en el archivo .env.

El proyecto es flexible y puede conectarse a cualquier API REST compatible.

👩‍💻 Contribuciones
Si quieres colaborar:

Haz un fork

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad)

Haz commit de tus cambios (git commit -m 'feat: nueva funcionalidad')

Haz push a tu rama (git push origin feature/nueva-funcionalidad)

Abre un Pull Request 🚀
