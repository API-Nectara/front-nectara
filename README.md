🦋 NECTARA – Mariposas de África

NECTARA es una aplicación full-stack creada con fines educativos.
El proyecto busca difundir el conocimiento sobre mariposas africanas y, al mismo tiempo, practicar el consumo de APIs REST implementando operaciones CRUD (GET, POST, PUT, DELETE).

🚀 Tecnologías utilizadas
Frontend

React + Vite

Axios (peticiones HTTP)

React Router (navegación)

CSS (estilos)

Jest / Testing Library (tests)

Backend

Node.js + Express

Sequelize (ORM)

MySQL (base de datos)

dotenv (variables de entorno)

Jest + Supertest (tests)

💡 Nota: Este backend se implementó con Sequelize + MySQL.
También puede adaptarse fácilmente a MongoDB + Mongoose, si se requiere un enfoque NoSQL.

📂 Estructura del proyecto
Frontend (/frontend)
src/
├── api          # Funciones CRUD (GET, POST, PUT, DELETE)
├── assets       # Imágenes y recursos estáticos
├── canvas       # Vista principal tipo "lienzo"
├── components   # Componentes reutilizables
├── layout       # Estructura de la aplicación
├── pages        # Páginas principales
├── router       # Configuración de rutas
├── services     # Servicios (CRUD de mariposas)
├── tests        # Tests unitarios
├── index.css    # Estilos globales
└── main.jsx     # Punto de entrada

Backend (/backend)
backend/
├── controllers/        # Lógica de negocio
├── database/           # Conexión a la BD
├── models/             # Modelos de Sequelize
├── routes/             # Endpoints de la API
├── seeds/              # Datos iniciales
├── test/               # Tests con Jest + Supertest
├── .env.local          # Variables de entorno local
├── .env.test           # Variables de entorno para testing
└── app.js              # Punto de entrada

⚙️ Instalación y configuración
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/nectara.git
cd nectara

2️⃣ Configurar el Frontend
cd frontend
npm install


Crear archivo .env.local:

VITE_API_URL=http://localhost:8080/butterflies


Ejecutar el proyecto:

npm run dev


👉 Disponible en: http://localhost:5173

3️⃣ Configurar el Backend
cd backend
npm install


Crear archivo .env.local:

DB_NAME=nectara_db
DB_USER=usuario
DB_PASS=contraseña
DB_HOST=localhost
DB_DIALECT=mysql


Crear archivo .env.test:

DB_NAME=nectara_test
NODE_ENV=test


Ejecutar el servidor:

npm run dev


👉 Disponible en: http://localhost:8080

🔗 Conexión Frontend ↔ Backend

El frontend consume la API expuesta por el backend.

Para conectarlos, asegúrate de que el backend esté corriendo en el puerto 8080.

En el frontend, configura la variable en .env.local:

VITE_API_URL=http://localhost:8080/butterflies


Ejemplo con Axios:

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getButterflies = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

🧪 Testing
Frontend
npm run test

Backend
npm run test


Los tests usan Jest y Supertest.

El backend valida que la BD de test tenga la palabra test en el nombre, para evitar borrar datos reales.

🐛 CRUD implementado

GET → Obtener todas las mariposas o una por ID

POST → Crear una nueva mariposa

PUT → Actualizar una mariposa existente

DELETE → Eliminar una mariposa

🗺️ Arquitectura del proyecto
        🖥️ Frontend (React + Vite)
                   │
         Axios (HTTP Requests)
                   │
        🌐 Backend (Express + Sequelize)
                   │
               🐬 MySQL


💡 Sugerencia: el backend puede extenderse a MongoDB + Mongoose si se requiere flexibilidad NoSQL.

👩‍💻 Equipo Frontend

Aday Álvarez

Anngy Pereira

Sofía Reyes

Ana Muruzabal

👩‍💻 Equipo Backend

Paloma Gómez

Gema Yébenez

Maryori Cruz

Ana Muruzabal

Camila Arenas