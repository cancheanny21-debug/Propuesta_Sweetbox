# 📊 Estado del Proyecto — SweetBox

> **Última actualización:** 09 de Junio de 2026  
> **Responsable:** Anny Liseth Canche Montaño  
> **Institución:** Alberto Enríquez — Desarrollo de Software  
> **Metodología:** Scrum  
> **Stack:** React.js + Capacitor + MySQL + Node.js/Express

---

## 🚦 Estado General

| Indicador | Valor |
|-----------|-------|
| **Fase actual** | 🟡 Iniciación / Planificación |
| **Sprint activo** | Sprint 0 — Configuración del Entorno |
| **Progreso global** | ██░░░░░░░░ 10% |
| **Fecha de inicio** | 26/05/2026 |
| **Fecha estimada de entrega** | Agosto 2026 |
| **Stack tecnológico** | React.js + Capacitor + MySQL + Node.js/Express |

---

## ✅ Completado

- [x] Propuesta del proyecto redactada y entregada
- [x] Definición de objetivos, funcionalidades y público objetivo
- [x] Elección del stack tecnológico (**React.js + Capacitor + MySQL + Node.js/Express**)
- [x] Diseño conceptual de la interfaz de usuario (4 pantallas principales)
- [x] Documentación técnica v2.0 actualizada al nuevo stack
- [x] Plan de desarrollo por sprints elaborado (Sprint 0 → Sprint 5)

---

## 🔄 En Progreso

- [ ] Instalación de Node.js, VS Code y Android Studio
- [ ] Creación del proyecto React con Vite
- [ ] Instalación y configuración de Capacitor
- [ ] Creación del backend Node.js + Express
- [ ] Instalación y configuración de MySQL (XAMPP / Workbench)
- [ ] Diseño detallado de las pantallas (Figma / bocetos avanzados)

---

## ⬜ Pendiente

### Sprint 1 — Base de Datos y Autenticación
- [ ] Crear esquema MySQL (tablas: usuarios, postres, pedidos, etc.)
- [ ] Modelos Sequelize + conexión a MySQL
- [ ] Endpoints de registro y login con JWT + bcrypt
- [ ] Middleware `verifyToken.js`
- [ ] Pantalla de Bienvenida / Welcome en React
- [ ] Pantalla de Registro con validaciones
- [ ] Pantalla de Inicio de Sesión
- [ ] Guardar JWT con Capacitor Preferences

### Sprint 2 — Catálogo de Postres
- [ ] Endpoints REST para postres (GET con filtros)
- [ ] Seeders MySQL con datos de prueba
- [ ] Pantalla Catálogo con grid 2 columnas en React
- [ ] Chips de categoría (Cupcakes, Pasteles, Galletas, Brownies)
- [ ] Barra de búsqueda en tiempo real
- [ ] Filtros avanzados (Ocasión, Precio)
- [ ] Sistema de favoritos (endpoints + botón corazón)
- [ ] Pantalla de detalle del producto

### Sprint 3 — Carrito de Compras
- [ ] CartContext (estado global del carrito)
- [ ] Pantalla de Carrito con lista de productos
- [ ] Personalización del pedido (sabor, relleno, mensaje)
- [ ] QuantitySelector (botones − y +)
- [ ] Cálculo dinámico de subtotal, envío y total
- [ ] Endpoint POST /api/orders (crear pedido en MySQL)
- [ ] Flujo de confirmación del pedido

### Sprint 4 — Seguimiento y Notificaciones
- [ ] Endpoints GET/PATCH para estado del pedido en MySQL
- [ ] Pantalla Tracking con OrderStepper (4 estados)
- [ ] Integración de mapa (Leaflet.js o Google Maps)
- [ ] Configurar Capacitor Push Notifications
- [ ] NotificationBanner y pantalla de historial de notificaciones
- [ ] Sistema de calificación al vendedor

### Sprint 5 — Pruebas, APK y Entrega
- [ ] Pruebas funcionales de todos los módulos
- [ ] Corrección de bugs
- [ ] Optimización de rendimiento y carga de imágenes
- [ ] Build de producción React (`npm run build`)
- [ ] `npx cap sync` y compilación APK en Android Studio
- [ ] Prueba del APK en dispositivo físico / emulador
- [ ] Documentación técnica finalizada
- [ ] Presentación final del proyecto

---

## 🖼️ Análisis de la Interfaz de Usuario (Diseño Propuesto)

A continuación se detalla el análisis de las 4 pantallas diseñadas en el mockup:

### Pantalla 1 — Registro / Bienvenida
| Elemento | Detalle |
|----------|---------|
| **Logo** | SweetBox con tipografía cursiva colorida sobre fondo pastel |
| **Imagen central** | Caja de regalo con postres (ilustración) |
| **Botones** | "Crear Cuenta" (verde/teal lleno) e "Iniciar Sesión" (borde) |
| **Login social** | Íconos de Facebook, Twitter y Google+ |
| **Paleta** | Fondo blanco/rosado, degradado suave |
| **Estado** | ✅ Diseño definido |

### Pantalla 2 — Catálogo de Postres
| Elemento | Detalle |
|----------|---------|
| **Búsqueda** | Barra con placeholder "Buscar tu postre ideal..." + ícono de filtro |
| **Categorías** | Chips horizontales: Cupcakes 🧁, Pasteles 🎂, Galletas 🍪, Brownies 🍫 |
| **Filtros avanzados** | Dropdowns: Filtres, Ocasión, Precio |
| **Grilla de productos** | 2 columnas, imagen + nombre + estrellas + precio |
| **Favoritos** | Corazón en esquina superior derecha de cada card |
| **Navegación inferior** | Home, Catálogo (activo), Carrito, Profile |
| **Estado** | ✅ Diseño definido |

### Pantalla 3 — Carrito de Compras
| Elemento | Detalle |
|----------|---------|
| **Header** | Título "Carrito" con flecha de regreso |
| **Item del pedido** | Imagen + nombre + personalización (Sabor, Relleno, Mensaje) |
| **Control de cantidad** | Botones — y + con número central |
| **Resumen de precio** | Subtotal, Envío, Total en negrita |
| **CTA principal** | Botón verde "Proceder al Pago" |
| **Mensaje** | ✅ "Recibirás tu pedido pronto" en verde |
| **Estado** | ✅ Diseño definido |

### Pantalla 4 — Seguimiento y Notificaciones
| Elemento | Detalle |
|----------|---------|
| **Banner de alerta** | "¡Tu pedido está en camino!" en amarillo/naranja |
| **Mapa** | Vista de mapa con pin del repartidor y ruta |
| **Stepper de estado** | 4 pasos: Confirmado → Preparación → En Camino → Entregado |
| **Info de pago** | Método y estado del pago (Visa ****1234 — Activo) |
| **Calificación** | Botón "Calificar Vendedor" |
| **Badge de notificación** | Campana con badge rojo en la barra inferior |
| **Estado** | ✅ Diseño definido |

---

## 📐 Análisis de UI/UX — Fortalezas y Oportunidades

### ✅ Fortalezas del Diseño
- **Paleta pastel coherente:** Los colores rosados y menta son consistentes con el concepto de postres, transmiten dulzura y modernidad.
- **Navegación clara:** La barra inferior de 4 ítems es intuitiva y estándar en apps móviles.
- **Personalización del producto:** La posibilidad de elegir sabor, relleno y mensaje agrega un diferenciador clave.
- **Seguimiento en tiempo real:** El stepper de 4 pasos + mapa es una funcionalidad de alto valor percibido.
- **Feedback visual:** El mensaje de confirmación y el banner de notificación mantienen al usuario informado.

### 🔧 Oportunidades de Mejora
- Agregar un **onboarding** de 2-3 slides para nuevos usuarios antes de la pantalla de bienvenida.
- Incluir una **pantalla de detalle del producto** al tocar una tarjeta del catálogo (actualmente no está en el mockup).
- Definir la pantalla de **Perfil de usuario** (historial de pedidos, datos personales).
- Considerar **modo oscuro** para mejorar la accesibilidad nocturna.
- Agregar **animaciones de transición** entre pantallas para mayor fluidez.

---

## 🐛 Registro de Issues

| # | Descripción | Tipo | Prioridad | Estado |
|---|-------------|------|-----------|--------|
| 001 | Pantalla de Perfil no definida en mockup | Diseño | Media | ⬜ Abierto |
| 002 | Pantalla de Detalle de Producto ausente | Diseño | Alta | ⬜ Abierto |
| 003 | Flujo de pago detallado no diseñado | Diseño | Alta | ⬜ Abierto |
| 004 | Onboarding para nuevos usuarios no incluido | UX | Baja | ⬜ Abierto |

---

## 📈 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Pantallas diseñadas | 4 / ~8 estimadas |
| Sprints completados | 0 / 6 (Sprint 0 a Sprint 5) |
| Funcionalidades implementadas | 0 / 7 |
| Tablas MySQL creadas | 0 / 6 |
| Endpoints REST implementados | 0 / ~15 estimados |
| Bugs abiertos | 4 (diseño) |
| Bugs cerrados | 0 |
| Cobertura de pruebas | 0% |

---

## 📅 Historial de Actualizaciones

| Fecha | Cambio | Responsable |
|-------|--------|-------------|
| 26/05/2026 | Creación de propuesta inicial | Anny Canche |
| 09/06/2026 | Análisis de propuesta, plan de desarrollo, documentación técnica y estado del proyecto (stack Flutter+Firebase) | Anny Canche |
| 09/06/2026 | **Cambio de stack:** Flutter/Firebase → React.js + Capacitor + MySQL + Node.js/Express. Actualización de los 3 documentos. | Anny Canche |

---

*Estado del Proyecto — SweetBox v1.0 | Junio 2026*
