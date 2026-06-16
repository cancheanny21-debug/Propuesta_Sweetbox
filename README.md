# 🧁 SweetBox — App Móvil de Postres Personalizados

> Plataforma de compra y venta de postres artesanales con catálogo digital, carrito de compras y seguimiento de pedidos en tiempo real.

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-orange)
![Sprint](https://img.shields.io/badge/Sprint%20Actual-3%20%E2%80%94%20Autenticación-blue)
![Licencia](https://img.shields.io/badge/Licencia-ISC-green)

---

## 📖 Descripción General

**SweetBox** es una aplicación móvil desarrollada con tecnologías web modernas y empaquetada como app nativa mediante **Capacitor**. Está pensada para emprendimientos de repostería que necesitan digitalizar su catálogo y gestionar pedidos de forma sencilla y elegante.

La arquitectura sigue el patrón **Cliente–Servidor** desacoplado:
- El **frontend** es una SPA (Single Page Application) en React que se comunica con el backend a través de una **API REST**.
- El **backend** expone endpoints JSON con autenticación basada en **JWT** y encriptación de contraseñas con **bcrypt**.
- La **base de datos** relacional en MySQL almacena usuarios, productos, pedidos y favoritos.

---

## 🛠️ Stack Tecnológico Completo

### 📱 Frontend — Capa de Presentación

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | v19.2.6 | Librería principal de UI basada en componentes |
| **React DOM** | v19.2.6 | Renderizado en el navegador / WebView de Capacitor |
| **React Router DOM** | v7.17.0 | Enrutamiento SPA (client-side routing) |
| **Vite** | v8.0.12 | Bundler y servidor de desarrollo ultrarrápido (HMR) |
| **Axios** | v1.18.0 | Cliente HTTP para consumo de la API REST |
| **Vanilla CSS** | — | Estilos personalizados con variables CSS y animaciones |

#### 📐 Decisiones de diseño frontend
- **React 19** — Se usa la versión más reciente para aprovechar mejoras de rendimiento y el nuevo compilador de React.
- **Vite sobre CRA** — Tiempos de arranque < 300ms vs. varios segundos con Create React App.
- **React Router v7** — Arquitectura de rutas declarativas con protección de rutas privadas (componente `PrivateRoute`).
- **Axios vs Fetch nativo** — Axios simplifica el manejo de interceptores, errores HTTP y serialización JSON.
- **Vanilla CSS con Custom Properties** — Se evita Tailwind para mantener control total sobre el diseño y reducir el bundle final. Variables CSS en `:root` para theming coherente.
- **Google Fonts — Quicksand** — Tipografía redondeada que refuerza la identidad visual dulce y moderna de la marca.

#### 🎨 Sistema de diseño visual
```css
:root {
  --primary-color:   #00C896;   /* Verde menta — acción principal */
  --secondary-color: #FFB6C1;   /* Rosa suave — acento */
  --text-dark:       #333333;   /* Texto principal */
  --text-light:      #777777;   /* Texto secundario */
  --shadow-soft:     0 8px 24px rgba(0,0,0,0.08);
  --border-radius-card: 20px;
  --border-radius-pill: 50px;
}
```
**Patrones UI aplicados:** Glassmorphism · Soft UI · Micro-animaciones · Bottom Sheet modals.

---

### 📦 Empaquetado Móvil — Capacitor

| Tecnología | Versión | Propósito |
|---|---|---|
| **@capacitor/core** | v8.4.0 | Runtime bridge entre WebView y APIs nativas |
| **@capacitor/cli** | v8.4.0 | Herramienta CLI para compilar a Android/iOS |

#### ¿Por qué Capacitor?
Capacitor es la evolución de Cordova, desarrollada por el equipo de **Ionic**. Permite compilar la misma app React a:
- ✅ **Android** (APK / AAB para Google Play Store)
- ✅ **iOS** (IPA para Apple App Store)
- ✅ **Web progresiva (PWA)**

El código React se ejecuta dentro de un **WebView nativo**, con acceso a APIs del dispositivo (cámara, GPS, notificaciones push) mediante plugins de Capacitor.

```json
// capacitor.config.json
{
  "appId": "com.sweetbox.app",
  "appName": "SweetBox",
  "webDir": "dist"
}
```

---

### ⚙️ Backend — Capa de Lógica y API REST

| Tecnología | Versión | Propósito |
|---|---|---|
| **Node.js** | LTS | Entorno de ejecución JavaScript del lado del servidor |
| **Express** | v5.2.1 | Framework minimalista para construir la API REST |
| **bcryptjs** | v3.0.3 | Hashing de contraseñas con salt (factor de costo = 10) |
| **jsonwebtoken** | v9.0.3 | Generación y verificación de tokens JWT (Bearer Auth) |
| **mysql2** | v3.22.5 | Driver MySQL con soporte de Promises y Pool de conexiones |
| **dotenv** | v17.4.2 | Gestión de variables de entorno desde `.env` |
| **cors** | v2.8.6 | Middleware para habilitar CORS entre frontend y backend |

#### 🔐 Flujo de Autenticación JWT

```
[Cliente]  POST /api/auth/register  →  { nombre, correo, password }
[Backend]  bcrypt.hash(password, 10)  →  INSERT INTO Users
[Cliente]  POST /api/auth/login     →  { correo, password }
[Backend]  bcrypt.compare()  →  jwt.sign({ userId, correo }, SECRET, { expiresIn: '7d' })
[Cliente]  localStorage.setItem('sweetbox_token', token)
[Backend]  Rutas protegidas verifican: Authorization: Bearer <token>
```

#### 🗂️ Arquitectura del Backend (MVC)

```
backend-api/
├── index.js                    ← Punto de entrada, registra middlewares y rutas
└── src/
    ├── config/
    │   ├── db.js               ← Pool de conexiones MySQL (mysql2/promise)
    │   ├── init.sql            ← DDL: CREATE TABLE + INSERT datos de prueba
    │   └── setupDb.js          ← Script para inicializar la BD desde cero
    ├── controllers/
    │   ├── authController.js   ← Lógica de register/login con JWT
    │   └── productController.js← Consultas SQL de productos con JOIN
    └── routes/
        ├── authRoutes.js       ← POST /api/auth/register, POST /api/auth/login
        └── productRoutes.js    ← GET /api/products
```

#### Express v5
Se utiliza **Express 5** (primera versión estable mayor después de v4 en ~10 años), que incluye:
- Manejo nativo de promesas en route handlers (async/await sin `try/catch` explícito).
- Router mejorado para rutas dinámicas.

---

### 🗄️ Base de Datos — MySQL Relacional

| Aspecto | Detalle |
|---|---|
| **Motor** | MySQL 8.x |
| **Driver** | `mysql2` con API de Promises y Pool de conexiones |
| **Puerto** | 3306 (por defecto) |
| **Herramienta sugerida** | XAMPP, WAMP, MySQL Workbench o Docker |

#### 📊 Esquema de Tablas (ERD simplificado)

```
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│    Users    │       │   Products   │       │  Categories  │
│─────────────│       │──────────────│       │──────────────│
│ id (PK)     │       │ id (PK)      │──────▶│ id (PK)      │
│ nombre      │       │ nombre       │       │ nombre       │
│ correo      │       │ categoria_id │       └──────────────┘
│ password_   │       │ precio       │
│   hash      │       │ rating       │
│ created_at  │       │ url_imagen   │
└──────┬──────┘       │ ingredientes │
       │              └──────┬───────┘
       │                     │
       ▼                     ▼
┌─────────────┐       ┌──────────────┐
│   Orders    │       │  Favorites   │
│─────────────│       │──────────────│
│ id (PK)     │       │ user_id (FK) │
│ user_id(FK) │       │ product_id   │
│ total       │       │   (FK)       │
│ estado      │       └──────────────┘
│ metodo_pago │
│ direccion   │
│ created_at  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   Order_Items   │
│─────────────────│
│ id (PK)         │
│ order_id (FK)   │
│ product_id (FK) │
│ cantidad        │
│ precio_unitario │
└─────────────────┘
```

---

### 🔧 Herramientas de Desarrollo

| Herramienta | Propósito |
|---|---|
| **ESLint v10** | Análisis estático de código JavaScript/JSX |
| **eslint-plugin-react-hooks** | Reglas de linting para hooks de React |
| **eslint-plugin-react-refresh** | Compatibilidad con HMR de Vite |
| **Git + GitHub** | Control de versiones y repositorio remoto |
| **dotenv** | Separación de configuración del código fuente |

---

## 📁 Estructura del Repositorio

```
Propuesta_Sweetbox/
│
├── frontend/                   ← App React (SPA + Capacitor)
│   ├── src/
│   │   ├── pages/              ← Vistas completas de la app
│   │   │   ├── Welcome.jsx     ← Pantalla de bienvenida
│   │   │   ├── Login.jsx       ← Inicio de sesión
│   │   │   ├── Register.jsx    ← Registro de usuario
│   │   │   ├── Catalog.jsx     ← Catálogo de productos
│   │   │   └── Profile.jsx     ← Perfil y cierre de sesión
│   │   ├── components/
│   │   │   └── BottomNav.jsx   ← Navegación inferior (Home, Favoritos, Carrito, Perfil)
│   │   ├── assets/             ← Imágenes y logo
│   │   ├── App.jsx             ← Router principal + rutas protegidas
│   │   └── index.css           ← Variables CSS globales y tema visual
│   ├── capacitor.config.json   ← Configuración de Capacitor
│   └── vite.config.js          ← Configuración del bundler
│
├── backend-api/                ← API REST en Node.js / Express
│   ├── index.js                ← Servidor Express principal
│   ├── .env                    ← Variables de entorno (NO subir a Git)
│   └── src/
│       ├── config/             ← BD: conexión, esquema SQL, setup
│       ├── controllers/        ← Lógica de negocio por dominio
│       └── routes/             ← Definición de endpoints HTTP
│
├── plan_de_desarrollo.md       ← Plan Scrum completo (7 Sprints)
├── documentacion_tecnica.md    ← Documentación técnica detallada
└── README.md                   ← Este archivo
```

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

### Requisitos Previos

- **Node.js** v18+ instalado → [nodejs.org](https://nodejs.org/)
- **MySQL** 8.x ejecutándose en el puerto 3306 (XAMPP, WAMP, Docker, o instalación nativa)
- **Git** para clonar el repositorio

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/cancheanny21/Propuesta_Sweetbox.git
cd Propuesta_Sweetbox
```

### 2️⃣ Configurar y Levantar el Backend

```bash
cd backend-api

# Instalar dependencias
npm install

# Verificar / editar variables de entorno
# El archivo .env debe contener:
#   DB_HOST=localhost
#   DB_USER=root
#   DB_PASSWORD=
#   DB_NAME=sweetbox_db
#   JWT_SECRET=tu_secreto_seguro
#   PORT=3000

# Inicializar la base de datos (crea tablas e inserta datos de prueba)
node src/config/setupDb.js

# Iniciar el servidor
npm start
# ✅ Servidor corriendo en http://localhost:3000
# ✅ GET http://localhost:3000/api/health  →  { status: "OK" }
```

### 3️⃣ Configurar y Levantar el Frontend

Abre **otra terminal** y ejecuta:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (con Hot Module Replacement)
npm run dev
# ✅ App disponible en http://localhost:5173
```

### 4️⃣ (Opcional) Compilar como App Nativa con Capacitor

```bash
cd frontend

# Generar el bundle de producción
npm run build

# Sincronizar con Android / iOS
npx cap sync android
npx cap open android   # Abre Android Studio

npx cap sync ios
npx cap open ios       # Abre Xcode (solo en macOS)
```

---

## 🔌 Endpoints de la API REST

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/health` | Verificación de estado del servidor | ❌ |
| `POST` | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| `POST` | `/api/auth/login` | Iniciar sesión — devuelve JWT | ❌ |
| `GET` | `/api/products` | Listar todos los productos | ✅ JWT |

> Los endpoints marcados con ✅ requieren el header `Authorization: Bearer <token>`.

---

## 📅 Estado de Desarrollo (Sprints Scrum)

| # | Sprint | Estado | Avance |
|---|---|---|---|
| 1 | Fundamentos, estructura base y BD | ✅ Completado | 100% |
| 2 | Catálogo de productos desde MySQL | ✅ Completado | 100% |
| 3 | Autenticación real con JWT + Perfil | 🔄 En progreso | ~70% |
| 4 | Carrito de Compras y Órdenes | ⏳ Pendiente | 0% |
| 5 | Pagos y Seguimiento de Pedido | ⏳ Pendiente | 0% |
| 6 | Favoritos completo | ⏳ Pendiente | 0% |
| 7 | Pruebas QA y Lanzamiento en Stores | ⏳ Pendiente | 0% |

**Progreso total del proyecto: ~40%**

---

## 🤝 Contribuciones

Este proyecto está en desarrollo activo. Para contribuir:
1. Haz un **fork** del repositorio.
2. Crea una rama con el nombre de tu feature: `git checkout -b feature/nombre-feature`.
3. Realiza tus cambios y haz commit: `git commit -m "feat: descripción del cambio"`.
4. Abre un **Pull Request** con una descripción clara de los cambios.

---

*Desarrollado con 💚 por el equipo SweetBox — Junio 2026*
