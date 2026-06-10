# 📋 Plan de Desarrollo — SweetBox

> **Institución:** Alberto Enríquez  
> **Carrera:** Desarrollo de Software  
> **Responsable:** Anny Liseth Canche Montaño  
> **Fecha de inicio:** 26/05/2026  
> **Metodología:** Scrum (Ágil)  
> **Stack:** React.js + Capacitor + MySQL + Node.js/Express

---

## 🎯 Objetivo General

Desarrollar una aplicación móvil híbrida llamada **SweetBox** para la venta y gestión de pedidos de postres, usando **React.js** como interfaz de usuario, **Capacitor** para desplegarla en Android, y **MySQL** como base de datos relacional con un backend **Node.js + Express**.

---

## 🗂️ Estructura de Sprints

### 🔹 Sprint 0 — Configuración del Entorno
**Duración:** 1 semana  
**Meta:** Tener el entorno de desarrollo listo y el proyecto base creado.

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Instalar Node.js, VS Code, Android Studio | Alta | ⬜ Pendiente |
| Crear proyecto React con Vite (`npm create vite@latest`) | Alta | ⬜ Pendiente |
| Instalar y configurar Capacitor en el proyecto React | Alta | ⬜ Pendiente |
| Crear proyecto backend Node.js + Express | Alta | ⬜ Pendiente |
| Instalar y configurar MySQL local (XAMPP / MySQL Workbench) | Alta | ⬜ Pendiente |
| Crear base de datos `sweetbox_db` en MySQL | Alta | ⬜ Pendiente |
| Configurar Sequelize y conexión a MySQL | Alta | ⬜ Pendiente |
| Crear repositorio en GitHub y estructura de carpetas | Media | ⬜ Pendiente |
| Configurar variables de entorno (`.env`) | Media | ⬜ Pendiente |

---

### 🔹 Sprint 1 — Base de Datos y Autenticación
**Duración:** 2 semanas  
**Meta:** Tener el esquema MySQL listo y el módulo de registro/login funcional con JWT.

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Crear tablas MySQL: `usuarios`, `postres`, `opciones_postre` | Alta | ⬜ Pendiente |
| Crear tablas MySQL: `pedidos`, `pedido_items`, `favoritos` | Alta | ⬜ Pendiente |
| Definir modelos Sequelize (User, Postre, Order, OrderItem) | Alta | ⬜ Pendiente |
| Endpoint `POST /api/auth/register` con bcrypt | Alta | ⬜ Pendiente |
| Endpoint `POST /api/auth/login` con JWT | Alta | ⬜ Pendiente |
| Middleware `verifyToken.js` para rutas protegidas | Alta | ⬜ Pendiente |
| Pantalla de Bienvenida en React (Welcome Screen) | Alta | ⬜ Pendiente |
| Pantalla de Registro con formulario y validaciones | Alta | ⬜ Pendiente |
| Pantalla de Inicio de Sesión | Alta | ⬜ Pendiente |
| Guardar JWT en Capacitor Preferences (storage seguro) | Alta | ⬜ Pendiente |
| Configurar React Router DOM para navegación | Alta | ⬜ Pendiente |
| Context API: `AuthContext` para estado de sesión global | Media | ⬜ Pendiente |

---

### 🔹 Sprint 2 — Catálogo de Postres
**Duración:** 2 semanas  
**Meta:** Mostrar el catálogo dinámico desde MySQL con filtros, búsqueda y favoritos.

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Endpoints GET `/api/postres` con filtros (categoría, precio) | Alta | ⬜ Pendiente |
| Endpoint GET `/api/postres/:id` (detalle del producto) | Alta | ⬜ Pendiente |
| Poblar MySQL con datos de prueba (seeders Sequelize) | Media | ⬜ Pendiente |
| Componente `ProductCard` (imagen, nombre, estrellas, precio) | Alta | ⬜ Pendiente |
| Pantalla `Catalog` con grid de 2 columnas en React | Alta | ⬜ Pendiente |
| Chips de categoría: Cupcakes, Pasteles, Galletas, Brownies | Alta | ⬜ Pendiente |
| Barra de búsqueda con filtrado en tiempo real | Alta | ⬜ Pendiente |
| Filtros avanzados: Ocasión y Precio (dropdowns) | Media | ⬜ Pendiente |
| Sistema de Favoritos: endpoints POST/DELETE `/api/favorites` | Media | ⬜ Pendiente |
| Botón de favorito (corazón) en cada `ProductCard` | Media | ⬜ Pendiente |
| Pantalla de detalle del producto | Alta | ⬜ Pendiente |
| Barra de navegación inferior (Home, Catálogo, Carrito, Perfil) | Alta | ⬜ Pendiente |

---

### 🔹 Sprint 3 — Carrito de Compras y Personalización
**Duración:** 2 semanas  
**Meta:** Permitir agregar productos al carrito y personalizar el pedido antes del pago.

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Context API: `CartContext` para gestión del carrito | Alta | ⬜ Pendiente |
| Pantalla `Cart` — lista de productos seleccionados | Alta | ⬜ Pendiente |
| Componente `CartItem` con imagen, nombre y personalización | Alta | ⬜ Pendiente |
| Selector de opciones: sabor, relleno, mensaje personalizado | Alta | ⬜ Pendiente |
| Componente `QuantitySelector` (botones − y +) | Alta | ⬜ Pendiente |
| Cálculo dinámico de subtotal, envío y total | Alta | ⬜ Pendiente |
| Botón "Proceder al Pago" con validación de carrito | Alta | ⬜ Pendiente |
| Endpoint `POST /api/orders` para crear pedido en MySQL | Alta | ⬜ Pendiente |
| Mensaje de confirmación tras crear el pedido | Media | ⬜ Pendiente |

---

### 🔹 Sprint 4 — Seguimiento de Pedidos y Notificaciones
**Duración:** 2 semanas  
**Meta:** Implementar rastreo del pedido en tiempo real y notificaciones push con Capacitor.

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Endpoint GET `/api/orders/:id` para estado del pedido | Alta | ⬜ Pendiente |
| Endpoint PATCH `/api/orders/:id/status` (cambiar estado) | Alta | ⬜ Pendiente |
| Pantalla `Tracking` con stepper de 4 estados | Alta | ⬜ Pendiente |
| Componente `OrderStepper` (Confirmado → Preparación → En Camino → Entregado) | Alta | ⬜ Pendiente |
| Integración de mapa (Google Maps o Leaflet.js) | Media | ⬜ Pendiente |
| Configurar Capacitor Push Notifications | Alta | ⬜ Pendiente |
| Componente `NotificationBanner` para alertas en pantalla | Media | ⬜ Pendiente |
| Pantalla de notificaciones con historial | Media | ⬜ Pendiente |
| Historial de pedidos en perfil de usuario | Media | ⬜ Pendiente |
| Sección de método de pago y calificación al vendedor | Baja | ⬜ Pendiente |

---

### 🔹 Sprint 5 — Pruebas, Compilación APK y Entrega
**Duración:** 2 semanas  
**Meta:** Probar todo el flujo, compilar el APK con Capacitor y preparar la presentación.

| Tarea | Prioridad | Estado |
|-------|-----------|--------|
| Pruebas funcionales de todos los módulos | Alta | ⬜ Pendiente |
| Corrección de bugs encontrados | Alta | ⬜ Pendiente |
| Optimización de carga de imágenes y rendimiento | Media | ⬜ Pendiente |
| Ajustes finales de UI/UX (responsive + móvil) | Media | ⬜ Pendiente |
| Build de producción React (`npm run build`) | Alta | ⬜ Pendiente |
| Sync y compilación APK en Android Studio (`npx cap sync`) | Alta | ⬜ Pendiente |
| Prueba del APK en dispositivo físico / emulador | Alta | ⬜ Pendiente |
| Documentación técnica finalizada | Alta | ⬜ Pendiente |
| Presentación del proyecto | Alta | ⬜ Pendiente |

---

## 🗓️ Cronograma General

```
Mayo 2026   Junio 2026    Julio 2026    Agosto 2026
│ Sprint 0 │ Sprint 1   │ Sprint 2   │ Sprint 3   │ Sprint 4   │ Sprint 5  │
│ Config   │ DB + Auth  │ Catálogo   │ Carrito    │ Seguim.    │ APK+Entrega│
└──────────┴────────────┴────────────┴────────────┴────────────┴───────────┘
```

---

## 🧰 Flujo de Trabajo de Desarrollo

```
1. Desarrollar componente/pantalla en React (Vite dev server)
        ↓
2. Conectar con API REST backend (Axios → Express → MySQL)
        ↓
3. Probar en navegador (http://localhost:5173)
        ↓
4. Build de producción: npm run build
        ↓
5. Sincronizar con Capacitor: npx cap sync
        ↓
6. Compilar y probar APK en Android Studio
```

---

## 🏁 Criterios de Éxito

- [ ] El usuario puede registrarse e iniciar sesión con JWT.
- [ ] El catálogo carga postres desde MySQL con filtros funcionales.
- [ ] Se puede agregar, personalizar y eliminar productos del carrito.
- [ ] El pedido se guarda correctamente en MySQL.
- [ ] El seguimiento del pedido muestra el estado en tiempo real.
- [ ] Las notificaciones push funcionan en Android con Capacitor.
- [ ] El APK se instala y ejecuta correctamente en Android.
- [ ] La interfaz es responsiva y funciona igual en web y móvil.

---

## 👥 Equipo

| Rol | Responsable |
|-----|-------------|
| Frontend React / UI | Anny Liseth Canche Montaño |
| Backend Node.js + MySQL | Anny Liseth Canche Montaño |
| Integración Capacitor / Android | Anny Liseth Canche Montaño |
| Testing / QA | Por definir |

---

*Última actualización: Junio 2026*
