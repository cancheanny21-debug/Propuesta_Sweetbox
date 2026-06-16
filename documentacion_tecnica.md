# 📄 Documentación Técnica: SweetBox
**Versión:** 1.0 | **Fecha:** Junio 2026 | **Estado:** En Desarrollo

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

El archivo `backend-api/.env` contiene las credenciales del sistema. **Nunca debe subirse a GitHub** (ya está en `.gitignore`).

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=sweetbox_db
PORT=3000
```

---

## 3. Estructura de Carpetas del Proyecto

```
Propuesta_Sweetbox/                   ← Raíz del repositorio
│
├── frontend/                         ← App React.js (cliente)
│   ├── src/
│   │   ├── assets/                   ← Imágenes y recursos estáticos
│   │   │   └── logo.png              ← Logo de SweetBox
│   │   ├── components/               ← Componentes reutilizables
│   │   │   ├── BottomNav.jsx         ← Barra de navegación inferior
│   │   │   └── BottomNav.css
│   │   ├── pages/                    ← Vistas/pantallas de la app
│   │   │   ├── Welcome.jsx           ← Pantalla de bienvenida (Login/Registro)
│   │   │   ├── Welcome.css
│   │   │   ├── Catalog.jsx           ← Catálogo de productos (Home)
│   │   │   └── Catalog.css
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
├── backend-api/                      ← API Node.js (servidor)
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

| Método | Ruta | Controlador | Descripción |
|---|---|---|---|
| `GET` | `/api/health` | `index.js` | Verifica que el servidor esté activo |
| `GET` | `/api/products` | `productController.getProducts` | Retorna todos los productos con su categoría |

**Ejemplo de respuesta `GET /api/products`:**
```json
[
  {
    "id": 1,
    "nombre": "Personalized Rainbow Cake",
    "categoria_id": 2,
    "precio": "25.00",
    "rating": "5.00",
    "url_imagen": "https://...",
    "ingredientes": "Vainilla, Fresa, Crema",
    "categoria_nombre": "Pasteles"
  }
]
```

---

### 5.2 Endpoints Pendientes — Autenticación

> Estos endpoints deben crearse en `backend-api/src/routes/authRoutes.js` y `authController.js`.

| Método | Ruta | Descripción | Body esperado |
|---|---|---|---|
| `POST` | `/api/auth/register` | Registra un nuevo usuario | `{ nombre, correo, password }` |
| `POST` | `/api/auth/login` | Autentica al usuario y retorna un token JWT | `{ correo, password }` |
| `GET` | `/api/auth/profile` | Retorna el perfil del usuario autenticado | Header: `Authorization: Bearer <token>` |

**Flujo de Registro esperado:**
```
Frontend (Welcome.jsx)
    │  POST /api/auth/register  { nombre, correo, password }
    ▼
authController.js
    ├── Valida que el correo no exista ya en Users
    ├── Hashea la contraseña con bcryptjs
    ├── INSERT INTO Users (nombre, correo, password)
    └── Responde con { message: "Usuario creado", userId: X }
```

**Flujo de Login esperado:**
```
Frontend (Welcome.jsx)
    │  POST /api/auth/login  { correo, password }
    ▼
authController.js
    ├── SELECT * FROM Users WHERE correo = ?
    ├── Compara hash: bcrypt.compare(password, user.password)
    ├── Si válido → genera JWT con jsonwebtoken
    └── Responde con { token: "eyJ...", user: { id, nombre, correo } }
```

---

## 6. Enrutamiento Frontend (React Router)

Definido en [`frontend/src/App.jsx`](file:///c:/Users/ANNY/Documents/GitHub/Propuesta_Sweetbox/frontend/src/App.jsx):

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Welcome.jsx` | Pantalla de bienvenida con Crear Cuenta / Iniciar Sesión |
| `/catalog` | `Catalog.jsx` | Catálogo de productos (Home) |
| `/login` | `Login.jsx` | **[PENDIENTE]** Formulario de inicio de sesión |
| `/register` | `Register.jsx` | **[PENDIENTE]** Formulario de registro |
| `/cart` | `Cart.jsx` | **[PENDIENTE]** Carrito de compras |
| `/tracking` | `Tracking.jsx` | **[PENDIENTE]** Seguimiento del pedido |
| `/profile` | `Profile.jsx` | **[PENDIENTE]** Perfil del usuario |

---

## 7. Problema Planteado: Login y Registro con Base de Datos

### 7.1 Situación Actual (Problema)

La pantalla `Welcome.jsx` actualmente **simula** el acceso: los botones "Crear Cuenta" e "Iniciar Sesión" redirigen directamente al catálogo **sin validar ningún usuario ni contraseña**. No existe ninguna lógica real de autenticación conectada a la base de datos.

```jsx
// SITUACIÓN ACTUAL — Welcome.jsx (líneas 26-27)
<button onClick={() => navigate('/catalog')}>Crear Cuenta</button>
<button onClick={() => navigate('/catalog')}>Iniciar Sesión</button>
// ↑ Ambos botones van directo al catálogo sin autenticación
```

### 7.2 Solución Requerida

Se debe implementar un sistema completo de autenticación en **3 capas**:

#### Capa 1 — Base de Datos (MySQL)
La tabla `Users` **ya existe** en `sweetbox_db`. Necesita recibir los registros reales cuando un usuario se registre:
```sql
-- Registro: insertar usuario con contraseña hasheada
INSERT INTO Users (nombre, correo, password) VALUES (?, ?, ?);

-- Login: buscar usuario por correo
SELECT id, nombre, correo, password FROM Users WHERE correo = ?;
```

#### Capa 2 — Backend (Node.js/Express)
Crear los archivos:
- `backend-api/src/controllers/authController.js` — lógica de negocio
- `backend-api/src/routes/authRoutes.js` — endpoints `/register` y `/login`
- Instalar: `npm install bcryptjs jsonwebtoken`

#### Capa 3 — Frontend (React.js)
Crear formularios reales en lugar de navegar directamente:
- `frontend/src/pages/Register.jsx` — formulario: nombre, correo, contraseña
- `frontend/src/pages/Login.jsx` — formulario: correo, contraseña
- Guardar el token JWT en `localStorage` al iniciar sesión
- Redirigir al catálogo solo si la autenticación es exitosa

### 7.3 Dependencias a Instalar

**Backend:**
```bash
cd backend-api
npm install bcryptjs jsonwebtoken
```

**Frontend (para peticiones HTTP):**
```bash
cd frontend
npm install axios
```

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
