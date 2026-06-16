# 📄 Documentación Técnica: SweetBox
**Versión:** 1.1 | **Fecha:** Junio 2026 | **Estado:** En Desarrollo (Sprints 3 y 4 Completados)

---

## 1. Descripción General del Sistema

**SweetBox** es una aplicación móvil multiplataforma orientada a la compra y venta de postres personalizados. La arquitectura sigue el patrón **Cliente–Servidor** con separación de responsabilidades en dos capas principales:

- **Frontend (Cliente):** Aplicación web construida con React.js y empaquetada como app móvil nativa mediante **Capacitor**.
- **Backend (Servidor):** API RESTful desarrollada con **Node.js + Express**, que gestiona la lógica de negocio, autenticación y acceso a datos.
- **Base de Datos:** Servidor **MySQL** que almacena de forma relacional todos los datos del sistema (usuarios, productos, pedidos, favoritos).

```
┌─────────────────────────────┐
│  APP MÓVIL (iOS / Android)  │
│  React.js + Capacitor       │
└────────────┬────────────────┘
             │ HTTP / JSON (API REST)
             ▼
┌─────────────────────────────┐
│  BACKEND API (Node.js)      │
│  Express + mysql2           │
│  Puerto: 3000               │
└────────────┬────────────────┘
             │ mysql2 Pool (TCP)
             ▼
┌─────────────────────────────┐
│  BASE DE DATOS              │
│  MySQL — sweetbox_db        │
│  Puerto: 3306               │
└─────────────────────────────┘
```

---

## 2. Stack Tecnológico Detallado

### 2.1 Frontend — Aplicación Móvil

| Tecnología | Versión | Rol |
|---|---|---|
| **React.js** | 19.2.x | Librería UI para construir componentes y vistas |
| **React Router DOM** | 7.17.x | Enrutamiento entre pantallas (SPA) |
| **Vite** | 8.0.x | Empaquetador y servidor de desarrollo |
| **Capacitor Core** | 8.4.x | Convierte la web app en app nativa iOS/Android |
| **Capacitor CLI** | 8.4.x | Herramienta de línea de comandos para Capacitor |
| **ESLint** | 10.x | Análisis estático del código JavaScript/JSX |

**Comando de desarrollo:**
```bash
cd frontend
npm run dev       # Inicia Vite en http://localhost:5173
npm run build     # Compila para producción (dist/)
```

---

### 2.2 Backend — API RESTful

| Tecnología | Versión | Rol |
|---|---|---|
| **Node.js** | 18+ LTS | Entorno de ejecución JavaScript del servidor |
| **Express.js** | 5.2.x | Framework para definir rutas y middlewares HTTP |
| **mysql2** | 3.22.x | Driver para conectarse a MySQL usando Promesas |
| **dotenv** | 17.x | Gestión de variables de entorno desde `.env` |
| **cors** | 2.8.x | Middleware para habilitar CORS en la API |

**Comando de inicio:**
```bash
cd backend-api
node index.js     # Inicia el servidor en http://localhost:3000
```

---

### 2.3 Base de Datos

| Característica | Detalle |
|---|---|
| **Motor** | MySQL (compatible con MariaDB) |
| **Nombre BD** | `sweetbox_db` |
| **Puerto** | `3306` (por defecto) |
| **Charset** | `utf8mb4` |
| **Conexión desde Node** | Pool de conexiones con `mysql2/promise` (límite: 10) |
| **Archivo de esquema** | `backend-api/src/config/init.sql` |

---

### 2.4 Variables de Entorno (`.env`)

El archivo `backend-api/.env` contiene las credenciales del sistema. **Nunca debe subirse a GitHub** (ya está│   │   ├── components/               ← Componentes reutilizables
│   │   │   ├── BottomNav.jsx         ← Barra de navegación inferior
│   │   │   └── BottomNav.css
│   │   ├── context/                  ← Contexto global
│   │   │   └── CartContext.jsx       ← Estado del carrito de compras
│   │   ├── pages/                    ← Vistas/pantallas de la app
│   │   │   ├── Welcome.jsx           ← Pantalla de bienvenida (Login/Registro/Redes sociales)
│   │   │   ├── Welcome.css
│   │   │   ├── Catalog.jsx           ← Catálogo de productos (Home)
│   │   │   ├── Catalog.css
│   │   │   ├── Login.jsx             ← Formulario de inicio de sesión real
│   │   │   ├── Register.jsx          ← Formulario de registro de usuario
│   │   │   ├── Profile.jsx           ← Perfil de usuario y logout
│   │   │   ├── ProfileEdit.jsx       ← Modificar datos del perfil
│   │   │   ├── Cart.jsx              ← Pantalla de Carrito de Compras
│   │   │   └── Cart.css              ← Estilos del carrito
│   │   ├── App.jsx                   ← Componente raíz con rutas
│   │   ├── App.css                   ← Estilos globales
│   │   ├── main.jsx                  ← Punto de entrada React
│   │   └── index.css                 ← Variables CSS y reset global
│   ├── public/                       ← Archivos públicos (favicon, etc.)
│   ├── index.html                    ← HTML base del SPA
│   ├── vite.config.js                ← Configuración de Vite
│   ├── capacitor.config.json         ← Configuración de Capacitor
│   └── package.json                  ← Dependencias del frontend
│
│├── backend-api/                      ← API Node.js (servidor)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 ← Pool de conexión a MySQL (mysql2)
│   │   │   ├── init.sql              ← Script SQL: crea tablas e inserta datos
│   │   │   └── setupDb.js            ← Script para inicializar la BD
│   │   ├── controllers/              ← Lógica de negocio por entidad
│   │   │   ├── productController.js  ← CRUD de productos
│   │   │   ├── authController.js     ← Autenticación y Perfil (JWT)
│   │   │   └── orderController.js    ← Gestión de pedidos (Transacciones)
│   │   └── routes/                   ← Definición de endpoints de la API
│   │       ├── productRoutes.js      ← Rutas: GET /api/products
│   │       ├── authRoutes.js         ← Rutas: Registro, login y perfil
│   │       └── orderRoutes.js        ← Rutas: POST /api/orders (Protegido por JWT)       ← API Node.js (servidor)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 ← Pool de conexión a MySQL (mysql2)
│   │   │   ├── init.sql              ← Script SQL: crea tablas e inserta datos
│   │   │   └── setupDb.js            ← Script para inicializar la BD
│   │   ├── controllers/              ← Lógica de negocio por entidad
│   │   │   ├── productController.js  ← CRUD de productos
│   │   │   └── authController.js     ← [PENDIENTE] Registro e inicio de sesión
│   │   └── routes/                   ← Definición de endpoints de la API
│   │       ├── productRoutes.js      ← Rutas: GET /api/products
│   │       └── authRoutes.js         ← [PENDIENTE] POST /api/auth/register, /login
│   ├── .env                          ← Variables de entorno (NO en Git)
│   ├── .gitignore
│   ├── index.js                      ← Punto de entrada del servidor Express
│   └── package.json                  ← Dependencias del backend
│
├── documentacion_tecnica.md          ← Este archivo
├── plan_de_desarrollo.md             ← Plan Scrum por Sprints
├── analisis_ui.md                    ← Análisis visual y UX de mockups
├── estado_del_proyecto.md            ← Tablero de tareas
└── README.md                         ← Instrucciones de instalación
```

---

## 4. Base de Datos MySQL — Esquema Detallado (`sweetbox_db`)

El esquema completo se encuentra en [`backend-api/src/config/init.sql`](file:///c:/Users/ANNY/Documents/GitHub/Propuesta_Sweetbox/backend-api/src/config/init.sql).

### 4.1 Diagrama Entidad–Relación (ERD)

```
┌──────────┐       ┌──────────────┐       ┌──────────────┐
│  Users   │──────<│   Orders     │>──────│ Order_Items  │
├──────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)  │       │ id (PK)      │       │ id (PK)      │
│ nombre   │       │ user_id (FK) │       │ order_id (FK)│
│ correo   │       │ total        │       │ product_id(FK│
│ password │       │ estado       │       │ cantidad     │
│created_at│       │ metodo_pago  │       │precio_unitari│
└──────────┘       │ direccion    │       └──────┬───────┘
     │             │ created_at   │              │
     │             └──────────────┘              │
     │                                           │
     │  ┌────────────┐       ┌───────────────┐   │
     └─<│ Favorites  │       │   Products    │>──┘
        ├────────────┤       ├───────────────┤
        │user_id(FK) │       │ id (PK)       │
        │product_id  │──────>│ nombre        │
        └────────────┘       │ categoria_id  │
                             │ precio        │
                             │ rating        │
        ┌────────────┐       │ url_imagen    │
        │ Categories │──────<│ ingredientes  │
        ├────────────┤       └───────────────┘
        │ id (PK)    │
        │ nombre     │
        └────────────┘
```

---

### 4.2 Tabla: `Users` (Usuarios)

> Almacena las credenciales y datos de cada usuario registrado en la app.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | Identificador único del usuario |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre completo del usuario |
| `correo` | VARCHAR(100) | NOT NULL, UNIQUE | Email (usado para login) |
| `password` | VARCHAR(255) | NOT NULL | Contraseña hasheada con bcrypt |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Fecha de registro |

**SQL:**
```sql
CREATE TABLE IF NOT EXISTS Users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    correo      VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> ⚠️ **Seguridad:** La contraseña JAMÁS se guarda en texto plano. Se usa `bcryptjs` para generar un hash seguro antes de insertar.

---

### 4.3 Tabla: `Categories` (Categorías)

> Clasifica los productos en tipos de postres.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | ID de la categoría |
| `nombre` | VARCHAR(50) | NOT NULL | Nombre (Cupcakes, Pasteles, Galletas, Brownies) |

**Datos iniciales insertados:**
```sql
INSERT INTO Categories (id, nombre) VALUES
(1, 'Cupcakes'), (2, 'Pasteles'), (3, 'Galletas'), (4, 'Brownies');
```

---

### 4.4 Tabla: `Products` (Productos)

> Catálogo de postres disponibles para compra.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | ID del producto |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre del postre |
| `categoria_id` | INT | FK → Categories.id | Categoría del producto |
| `precio` | DECIMAL(10,2) | NOT NULL | Precio de venta |
| `rating` | DECIMAL(3,2) | DEFAULT 0.00 | Calificación promedio (0–5) |
| `url_imagen` | VARCHAR(255) | — | URL de la imagen del producto |
| `ingredientes` | TEXT | — | Lista de ingredientes |

---

### 4.5 Tabla: `Orders` (Pedidos)

> Registra cada orden de compra realizada por un usuario.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | ID del pedido |
| `user_id` | INT | FK → Users.id | Usuario que realizó el pedido |
| `total` | DECIMAL(10,2) | NOT NULL | Total pagado |
| `estado` | ENUM | DEFAULT 'Confirmado' | Estado: Confirmado / En Preparacion / En Camino / Entregado |
| `metodo_pago` | VARCHAR(50) | — | Ej: Tarjeta, Efectivo, Transferencia |
| `direccion` | TEXT | — | Dirección de entrega |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Fecha y hora del pedido |

---

### 4.6 Tabla: `Order_Items` (Detalle del Pedido)

> Guarda cada producto individual dentro de un pedido.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | ID del ítem |
| `order_id` | INT | FK → Orders.id | Pedido al que pertenece |
| `product_id` | INT | FK → Products.id | Producto incluido |
| `cantidad` | INT | NOT NULL | Unidades del producto |
| `precio_unitario` | DECIMAL(10,2) | NOT NULL | Precio en el momento de compra |

---

### 4.7 Tabla: `Favorites` (Favoritos)

> Relación muchos-a-muchos entre usuarios y productos favoritos.

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `user_id` | INT | PK, FK → Users.id | Usuario |
| `product_id` | INT | PK, FK → Products.id | Producto marcado como favorito |

> La clave primaria es compuesta **(user_id, product_id)** para evitar duplicados.

---

## 5. API REST — Endpoints Definidos

### 5.1 Endpoints Implementados

| Método | Ruta | Controlador | Descripción | Requiere Auth |
|---|---|---|---|---|
| `GET` | `/api/health` | `index.js` | Verifica que el servidor esté activo | No |
| `GET` | `/api/products` | `productController.getProducts` | Retorna todos los productos con su categoría | Sí (JWT) |
| `POST` | `/api/auth/register` | `authController.register` | Registra un nuevo usuario en la base de datos | No |
| `POST` | `/api/auth/login` | `authController.login` | Autentica al usuario y retorna sus datos y token JWT | No |
| `GET` | `/api/auth/profile` | `authController.getProfile` | Retorna el perfil del usuario autenticado | Sí (JWT) |
| `POST` | `/api/orders` | `orderController.createOrder` | Crea un nuevo pedido con transacción en MySQL | Sí (JWT) |

### 5.2 Endpoints Pendientes para Sprints Futuros

| Método | Ruta | Descripción | Body esperado |
|---|---|---|---|
| `POST` | `/api/payments/process` | Procesa pagos simulados con Stripe/PayPal (Sprint 5) | `{ orderId, paymentMethodDetails }` |
| `PUT` | `/api/orders/:id/status` | Actualiza el estado del pedido (Sprint 5) | `{ estado }` |
| `GET` | `/api/favorites` | Obtiene la lista de favoritos de un usuario (Sprint 6) | Header: `Authorization: Bearer <token>` |
| `POST` | `/api/favorites` | Añade un producto a favoritos (Sprint 6) | `{ product_id }` |

---

## 6. Enrutamiento Frontend (React Router)

Definido en [`frontend/src/App.jsx`](file:///c:/Users/ANNY/Documents/GitHub/Propuesta_Sweetbox/frontend/src/App.jsx):

| Ruta | Componente | Estado | Descripción |
|---|---|---|---|
| `/` | `Welcome.jsx` | ✅ Completado | Pantalla de bienvenida con accesos y login social (Google, Facebook) |
| `/login` | `Login.jsx` | ✅ Completado | Formulario de inicio de sesión real conectado al Backend |
| `/register` | `Register.jsx` | ✅ Completado | Formulario de registro conectado al Backend |
| `/catalog` | `Catalog.jsx` | ✅ Completado | Catálogo de productos (Home) con "Añadir al Carrito" |
| `/cart` | `Cart.jsx` | ✅ Completado | Carrito de compras, cantidades y envío de pedido a MySQL |
| `/profile` | `Profile.jsx` | ✅ Completado | Perfil del usuario, fecha de registro y logout |
| `/profile/edit` | `ProfileEdit.jsx` | ✅ Completado | Modificación de datos del perfil del usuario |
| `/tracking` | `Tracking.jsx` | ⏳ Pendiente | Seguimiento del pedido en tiempo real con mapas (Sprint 5) |

---

## 7. Solución de Autenticación y Carrito de Compras

Las tareas de autenticación y carrito de compras fueron resueltas e implementadas al 100%:
- **Autenticación real:** Registro (`/register`) e inicio de sesión (`/login`) conectados a la base de datos MySQL con contraseñas seguras hasheadas vía `bcryptjs` y emisión de tokens `jsonwebtoken`.
- **Rutas Protegidas:** Componente `PrivateRoute` en el frontend para evitar accesos no autorizados a pantallas privadas como catálogo, carrito y perfil.
- **Flujo de pedidos transaccional:** Envíos automáticos desde la pantalla del carrito al endpoint `POST /api/orders`, insertando registros de forma segura en las tablas `Orders` y `Order_Items` empleando transacciones de SQL para evitar inconsistencias en caso de fallo.

---

## 8. Seguridad

| Aspecto | Solución |
|---|---|
| **Contraseñas** | Hash con `bcryptjs` (salt rounds: 10), nunca texto plano |
| **Autenticación** | Tokens JWT firmados con clave secreta (`JWT_SECRET` en `.env`) |
| **CORS** | Configurado en Express para permitir solo el origen del frontend |
| **Variables secretas** | Gestionadas en `.env`, excluidas de Git con `.gitignore` |
| **SQL Injection** | Uso de consultas parametrizadas `?` con `mysql2` |

---

## 9. Entorno de Desarrollo

| Herramienta | Uso |
|---|---|
| **VS Code** | IDE principal |
| **XAMPP / MySQL Workbench** | Administración de la base de datos MySQL local |
| **Postman / Thunder Client** | Prueba manual de endpoints de la API |
| **Git + GitHub** | Control de versiones |
| **npm** | Gestor de paquetes para frontend y backend |

---

*Documento generado para el proyecto SweetBox — Fase de Desarrollo v1.0*
