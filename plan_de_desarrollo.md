# Plan de Desarrollo: SweetBox
**Metodología:** Scrum — Sprints de 2 semanas | **Estado:** Sprint 3 en fase final

---

## 1. Introducción

Este documento detalla el plan de desarrollo para la aplicación móvil **SweetBox**, una plataforma para la compra y venta de postres personalizados. La arquitectura es Cliente–Servidor: **React.js + Capacitor** (frontend) conectado a una **API REST con Node.js/Express** y base de datos **MySQL (`sweetbox_db`)**.

---

## 2. Metodología

Se utiliza **Scrum**, con Sprints de 2 semanas. Cada Sprint produce un incremento funcional y verificable del producto.

---

## 3. Fases del Proyecto (Sprints)

---

### ✅ Sprint 1: Fundamentos y Autenticación
**Avance:** `[██████████] 100%` — **¡COMPLETADO!**

#### Objetivo
Establecer la base técnica del proyecto y conectar frontend con backend y base de datos.

#### Tareas Completadas

| # | Tarea | Archivos Involucrados |
|---|---|---|
| 1 | Inicializar proyecto React con Vite | `frontend/package.json`, `vite.config.js`, `index.html` |
| 2 | Instalar y configurar Capacitor | `capacitor.config.json`, `frontend/package.json` |
| 3 | Configurar enrutamiento con React Router | `frontend/src/App.jsx` |
| 4 | Crear tema visual global (colores, tipografía) | `frontend/src/index.css`, `App.css` |
| 5 | Desarrollar pantalla de Bienvenida (UI) | `frontend/src/pages/Welcome.jsx`, `Welcome.css` |
| 6 | Inicializar proyecto backend Node.js/Express | `backend-api/package.json`, `backend-api/index.js` |
| 7 | Configurar pool de conexión MySQL (`mysql2`) | `backend-api/src/config/db.js` |
| 8 | Crear esquema SQL de la base de datos | `backend-api/src/config/init.sql` |
| 9 | Script de inicialización de la BD | `backend-api/src/config/setupDb.js` |
| 10 | Configurar variables de entorno | `backend-api/.env` |
| 11 | Crear componente Navegación Inferior | `frontend/src/components/BottomNav.jsx`, `BottomNav.css` |

#### Base de Datos — Tablas Creadas en este Sprint
- ✅ `Users` — id, nombre, correo, password, created_at
- ✅ `Categories` — id, nombre
- ✅ `Products` — id, nombre, categoria_id, precio, rating, url_imagen, ingredientes
- ✅ `Orders` — id, user_id, total, estado, metodo_pago, direccion, created_at
- ✅ `Order_Items` — id, order_id, product_id, cantidad, precio_unitario
- ✅ `Favorites` — user_id, product_id

#### API Endpoints Creados
- ✅ `GET /api/health` — Verificación del servidor

---

### ✅ Sprint 2: Catálogo y Navegación
**Avance:** `[██████████] 100%` — **¡COMPLETADO!**

#### Objetivo
Mostrar el catálogo de productos real desde la base de datos MySQL.

#### Tareas Completadas

| # | Tarea | Archivos Involucrados |
|---|---|---|
| 1 | Diseñar pantalla Catálogo (Home) con grid de productos | `frontend/src/pages/Catalog.jsx`, `Catalog.css` |
| 2 | Implementar barra de búsqueda y filtros por categoría | `Catalog.jsx` |
| 3 | Crear tarjetas de producto (imagen, nombre, precio, rating) | `Catalog.jsx` |
| 4 | Crear controlador de productos en el backend | `backend-api/src/controllers/productController.js` |
| 5 | Definir ruta `GET /api/products` | `backend-api/src/routes/productRoutes.js` |
| 6 | Conectar Catálogo con API (fetch desde React) | `Catalog.jsx` |
| 7 | Insertar productos de prueba en la BD | `backend-api/src/config/init.sql` |

#### API Endpoints Creados
- ✅ `GET /api/products` — Lista todos los productos con JOIN a Categories

---

### ✅ Sprint 3: Autenticación Real con Base de Datos
**Avance:** `[██████████] 100%` — **¡COMPLETADO!**

#### Objetivo
Implementar registro e inicio de sesión funcional, conectado a la tabla `Users` de MySQL. Los botones de la pantalla de bienvenida deben redirigir a formularios reales y guardar/validar credenciales en la base de datos.

#### Tareas

| # | Tarea | Estado | Archivos |
|---|---|---|---|
| 1 | Instalar `bcryptjs` y `jsonwebtoken` en backend | ✅ Hecho | `backend-api/package.json` |
| 2 | Crear `authController.js` (lógica de registro y login) | ✅ Hecho | `backend-api/src/controllers/authController.js` |
| 3 | Crear `authRoutes.js` (rutas `/register` y `/login`) | ✅ Hecho | `backend-api/src/routes/authRoutes.js` |
| 4 | Registrar las rutas de auth en el servidor | ✅ Hecho | `backend-api/index.js` |
| 5 | Instalar `axios` en frontend | ✅ Hecho | `frontend/package.json` |
| 6 | Crear página `Register.jsx` con formulario | ✅ Hecho | `frontend/src/pages/Register.jsx` |
| 7 | Crear página `Login.jsx` con formulario | ✅ Hecho | `frontend/src/pages/Login.jsx` |
| 8 | Conectar `Welcome.jsx` a las rutas `/register`, `/login` e iconos sociales | ✅ Hecho | `frontend/src/pages/Welcome.jsx` |
| 9 | Guardar token JWT en `localStorage` al iniciar sesión | ✅ Hecho | `frontend/src/pages/Login.jsx` |
| 10 | Proteger la ruta `/catalog` (solo usuarios autenticados) | ✅ Hecho | `frontend/src/App.jsx` |
| 11 | Implementar Cierre de Sesión y navegación de Perfil | ✅ Hecho | `Profile.jsx`, `App.jsx` |

#### Flujo de Registro (Base de Datos)
```
Usuario llena formulario → POST /api/auth/register
  → authController valida campos
  → bcrypt.hash(password, 10)
  → INSERT INTO Users (nombre, correo, password_hash)
  → Responde { message: "Registrado", userId }
  → Frontend redirige a /login
```

#### Flujo de Login (Base de Datos)
```
Usuario llena formulario → POST /api/auth/login
  → authController busca: SELECT * FROM Users WHERE correo = ?
  → bcrypt.compare(password, user.password)
  → jsonwebtoken.sign({ userId, correo }) → token JWT
  → Frontend guarda token en localStorage
  → Redirige a /catalog
```

---

### ✅ Sprint 4: Carrito de Compras
**Avance:** `[██████████] 100%` — **¡COMPLETADO!**

#### Objetivo
Permitir al usuario agregar, quitar y modificar productos en su carrito.

#### Tareas Planificadas

| # | Tarea | Estado | Archivos |
|---|---|---|---|
| 1 | Agregar botón 'Añadir al Carrito' en `Catalog.jsx` | ✅ Hecho | `Catalog.jsx` |
| 2 | Lógica de contexto global para el carrito (React Context) | ✅ Hecho | `CartContext.jsx` |
| 3 | Implementar Badge de cantidad en `BottomNav.jsx` | ✅ Hecho | `BottomNav.jsx` |
| 4 | Crear pantalla `Cart.jsx` con listado de ítems | ✅ Hecho | `frontend/src/pages/Cart.jsx`, `Cart.css` |
| 5 | Controles de cantidad (+/-) y eliminación de productos | ✅ Hecho | `Cart.jsx` |
| 6 | Cálculo de subtotal, costo de envío y total | ✅ Hecho | `Cart.jsx` |
| 7 | Endpoint `POST /api/orders` para crear pedido | ✅ Hecho | `backend-api/src/controllers/orderController.js` |
| 8 | Insertar en tablas `Orders` y `Order_Items` de la BD | ✅ Hecho | `orderController.js` |

---

### ⏳ Sprint 5: Pagos y Seguimiento de Pedido
**Avance:** `[----------] 0%` — **Pendiente**

#### Objetivo
Procesar pagos e implementar el rastreo en tiempo real del pedido.

#### Tareas Planificadas

| # | Tarea | Archivos |
|---|---|---|
| 1 | Pantalla de pago con selección de método | `frontend/src/pages/Checkout.jsx` |
| 2 | Integración de pasarela de pagos (Stripe/PayPal) | `backend-api/src/controllers/paymentController.js` |
| 3 | Pantalla de seguimiento `Tracking.jsx` con mapa | `frontend/src/pages/Tracking.jsx` |
| 4 | Integración Google Maps / Leaflet para la ruta | `Tracking.jsx` |
| 5 | Actualización de `estado` en tabla `Orders` | `orderController.js` |
| 6 | Sistema de Notificaciones Push (Capacitor Push Plugin) | `capacitor.config.json`, backend |

---

### ⏳ Sprint 6: Perfil y Favoritos
**Avance:** `[----------] 0%` — **Pendiente**

#### Objetivo
Gestionar el perfil del usuario y su lista de favoritos sincronizada con la BD.

#### Tareas Planificadas

| # | Tarea | Archivos |
|---|---|---|
| 1 | Pantalla `Profile.jsx` con datos del usuario | `frontend/src/pages/Profile.jsx` |
| 2 | Endpoint `GET /api/auth/profile` con JWT | `authController.js` |
| 3 | Lógica de favoritos (agregar/quitar) | `Catalog.jsx`, `frontend/src/context/FavoritesContext.jsx` |
| 4 | Endpoints `POST/DELETE /api/favorites` | `backend-api/src/controllers/favoritesController.js` |
| 5 | Insertar/eliminar en tabla `Favorites` de la BD | `favoritesController.js` |
| 6 | Pantalla `Favorites.jsx` con lista de favoritos | `frontend/src/pages/Favorites.jsx` |

---

### ⏳ Sprint 7: Pruebas y Lanzamiento
**Avance:** `[----------] 0%` — **Pendiente**

#### Objetivo
Asegurar la calidad del producto y prepararlo para su publicación en tiendas.

#### Tareas Planificadas

| # | Tarea |
|---|---|
| 1 | Pruebas de usabilidad con usuarios reales |
| 2 | Corrección de errores (QA) |
| 3 | Optimización de rendimiento (lazy loading, caché) |
| 4 | Compilar con `npx cap build android` / `npx cap build ios` |
| 5 | Publicar en Google Play Store y Apple App Store |

---

## 4. Resumen de Progreso General

| Sprint | Nombre | Estado | % |
|---|---|---|---|
| Sprint 1 | Fundamentos y Estructura Base | ✅ Completado | 100% |
| Sprint 2 | Catálogo y Navegación | ✅ Completado | 100% |
| Sprint 3 | Autenticación con Base de Datos | ✅ Completado | 100% |
| Sprint 4 | Carrito de Compras | ✅ Completado | 100% |
| Sprint 5 | Pagos y Seguimiento | ⏳ Pendiente | 0% |
| Sprint 6 | Perfil y Favoritos | ⏳ Pendiente | 0% |
| Sprint 7 | Pruebas y Lanzamiento | ⏳ Pendiente | 0% |

**Progreso Total del Proyecto: ~57%**

---

*Plan de Desarrollo SweetBox — Actualizado Junio 2026*

