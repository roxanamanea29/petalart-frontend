# 🌸 PetalArt Frontend – Floristería Online

Este repositorio contiene la interfaz de usuario de **PetalArt**, una aplicación web de comercio electrónico desarrollada como Trabajo de Fin de Grado en Desarrollo de Aplicaciones Web (DAW). El frontend está construido con **React + Vite**, y se conecta a una API RESTful desarrollada en Spring Boot.

---

## 🧩 Tecnologías utilizadas

- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS + CSS propio
- Context API
- LocalStorage (para carrito sin login)

---

## 📁 Estructura del proyecto

petalart-frontend/
├── public/
│ ├── images/
│ ├── gallery/
│ └── banner_html/
├── src/
│ ├── assets/ # Imágenes, íconos
│ ├── css/ # Archivos de estilos
│ ├── Configuration/ # Configs de rutas o API
│ ├── components/ # Componentes reutilizables
│ ├── components_admin/ # Componentes del panel admin
│ ├── hooks/ # Custom hooks (useCart, useAuth…)
│ ├── pages/ # Vistas principales
│ │ ├── admin/ # Páginas para administrador
│ │ └── user/ # Páginas para usuarios
│ └── routes/ # Definición de rutas
├── package.json
├── vite.config.js
└── README.md

---

## 🚀 Funcionalidades clave

- Catálogo de productos con filtros por categoría
- Registro / Login con JWT
- Carrito de compras persistente (guest + user)
- Checkout con dirección y confirmación de pedido
- Gestión de pedidos y direcciones por usuario
- Panel de administración: CRUD de productos, pedidos, categorías
- Rutas protegidas por roles (`USER`, `ADMIN`)
- Diseño responsive para móviles y escritorio

---

## 🛠️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/roxanamanea29/petalart-frontend.git
cd petalart-frontend

2. Instalar dependencias
npm install

3. Crear archivo .env con la URL del backend
VITE_API_URL=http://localhost:8080

4. Ejecutar la aplicación
npm run dev
La app estará disponible en: http://localhost:5173

🌐 Rutas principales
| Ruta              | Descripción                              |
| ----------------- | ---------------------------------------- |
| `/`               | Página de inicio                         |
| `/login`          | Formulario de acceso                     |
| `/register`       | Registro de nuevo usuario                |
| `/productos`      | Catálogo general                         |
| `/categorias/:id` | Productos por categoría                  |
| `/carrito`        | Vista del carrito                        |
| `/checkout`       | Finalizar compra                         |
| `/cuenta`         | Panel del usuario                        |
| `/admin`          | Panel de administración (requiere admin) |


🔐 Seguridad y control de acceso
Acceso condicional a rutas según rol (User/Admin)

JWT almacenado en localStorage

Interceptor Axios para enviar el token en cada request

🧑‍💻 Autora
Roxana Manea
📧 manea.roxanaa@gmail.com
🔗 GitHub: roxanamanea29

📜 Licencia
Este proyecto está licenciado bajo los términos de la Licencia MIT.
Consulta el archivo LICENSE en el repositorio principal.

