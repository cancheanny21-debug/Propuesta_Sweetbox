# 📊 Estado del Proyecto — SweetBox

> **Última actualización:** 09 de Junio de 2026  
> **Responsable:** Anny Liseth Canche Montaño  
> **Institución:** Alberto Enríquez — Desarrollo de Software  
> **Metodología:** Scrum

---

## 🚦 Estado General

| Indicador | Valor |
|-----------|-------|
| **Fase actual** |  Ejecución - Desarrollo |
| **Sprint activo** | Sprint 3 — Carrito de Compras y Personalización |
| **Progreso global** | █████░░░░░ 50% |
| **Fecha de inicio** | 26/05/2026 |
| **Fecha estimada de entrega** | Agosto 2026 |

---

## ✅ Completado

- [x] Propuesta del proyecto redactada y entregada
- [x] Definición de objetivos, funcionalidades y público objetivo
- [x] Elección del stack tecnológico (Flutter, Dart, Firebase, Android Studio)
- [x] Actualización de Stack: React.js + Capacitor + MySQL
- [x] Diseño conceptual de la interfaz de usuario (4 pantallas principales)
- [x] Documentación técnica inicial creada
- [x] Plan de desarrollo por sprints elaborado
- [x] Configuración de Node.js y Sequelize

---

## 🔄 En Progreso

+ [ ] Desarrollo de frontend en React.js con Vite
+ [ ] Implementación de endpoints de Autenticación (Login/Register)

---

## ⬜ Pendiente

### Sprint 1 — Autenticación
- [x] Pantalla de Bienvenida / Welcome
- [x] Pantalla de Registro
- [x] Pantalla de Inicio de Sesión
- [ ] Login social (Google, Facebook)

### Sprint 2 — Catálogo
- [x] Pantalla de Catálogo con grid de productos
- [x] Filtros por categoría y precio
- [x] Barra de búsqueda
- [x] Sistema de favoritos

### Sprint 3 — Carrito
- [ ] Pantalla de Carrito
- [ ] Personalización del pedido (sabor, relleno, mensaje)
- [ ] Cálculo de totales
- [ ] Flujo de pago

### Sprint 4 — Seguimiento y Notificaciones
- [ ] Pantalla de Seguimiento de Pedido
- [ ] Integración con mapa (repartidor en tiempo real)
- [ ] Notificaciones push (FCM)
- [ ] Sistema de calificación al vendedor

### Sprint 5 — Pruebas y Entrega
- [ ] Pruebas funcionales completas
- [ ] Corrección de bugs
- [ ] Optimización de rendimiento
- [ ] Generación de APK demo
- [ ] Presentación final

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
- [x] Incluir una **pantalla de detalle del producto** al tocar una tarjeta del catálogo (implementado mediante el modal de personalización).
- Definir la pantalla de **Perfil de usuario** (historial de pedidos, datos personales).
- Considerar **modo oscuro** para mejorar la accesibilidad nocturna.
- Agregar **animaciones de transición** entre pantallas para mayor fluidez.

---

## 🐛 Registro de Issues

| # | Descripción | Tipo | Prioridad | Estado |
|---|-------------|------|-----------|--------|
| 001 | Pantalla de Perfil no definida en mockup | Diseño | Media | ⬜ Abierto |
| 002 | Pantalla de Detalle de Producto ausente | Diseño | Alta | ✅ Cerrado (Implementado en modal) |
| 003 | Flujo de pago detallado no diseñado | Diseño | Alta | ⬜ Abierto |
| 004 | Onboarding para nuevos usuarios no incluido | UX | Baja | ⬜ Abierto |

---

## 📈 Métricas del Proyecto

| Pantallas diseñadas | 5 / ~8 estimadas |
| Sprints completados | 2 / 5 |
| Funcionalidades implementadas | 2 / 7 |
| Bugs abiertos | 3 (diseño) |
| Bugs cerrados | 1 |
| Cobertura de pruebas | 0% |

---

## 📅 Historial de Actualizaciones

| Fecha | Cambio | Responsable |
|-------|--------|-------------|
| 26/05/2026 | Creación de propuesta inicial | Anny Canche |
| 09/06/2026 | Análisis de propuesta, plan de desarrollo, documentación técnica y estado del proyecto | Anny Canche |

---

*Estado del Proyecto — SweetBox v1.0 | Junio 2026*
