# Plan de Desarrollo: SweetBox

## 1. Introducción
Este documento detalla el plan de desarrollo para la aplicación móvil **SweetBox**, una plataforma diseñada para facilitar la compra y venta de postres personalizados.

## 2. Metodología
Se utilizará la metodología ágil **Scrum**, dividiendo el trabajo en Sprints de 2 semanas para entregar incrementos funcionales del producto de manera iterativa.

## 3. Fases del Proyecto (Sprints)

### Sprint 1: Fundamentos y Autenticación
*   Configuración del proyecto con React.js y Capacitor.
*   Configuración de la base de datos MySQL y el backend (API).
*   Desarrollo de la pantalla de Bienvenida (Logo y opciones de acceso).
*   Implementación de Registro e Inicio de sesión (Email/Contraseña y Redes Sociales).
*   Configuración del menú de navegación inferior (Bottom Navigation Bar).

### Sprint 2: Catálogo y Navegación
*   Diseño y desarrollo de la pantalla de Catálogo (Home).
*   Implementación de la barra de búsqueda y filtros (Ocasión, Precio).
*   Creación de categorías (Cupcakes, Pasteles, Galletas, Brownies).
*   Diseño de las tarjetas de productos (Imagen, nombre, precio, calificación).
*   Implementación de la funcionalidad de "Favoritos".

### Sprint 3: Carrito y Compras
*   Desarrollo de la pantalla "Mi Carrito".
*   Lógica para agregar, eliminar y modificar cantidades de productos.
*   Cálculo de subtotal, costo de envío y total.
*   Pantalla de detalle del producto (selección de sabor, relleno, mensaje personalizado).

### Sprint 4: Pagos y Seguimiento
*   Integración de pasarela de pagos / métodos de pago digitales.
*   Pantalla de Seguimiento de Pedido con integración de mapas.
*   Lógica de estados del pedido (Confirmado, En preparación, En camino, Entregado).
*   Sistema de Notificaciones Push.
*   Funcionalidad para "Calificar Vendedor".

### Sprint 5: Pruebas y Lanzamiento
*   Pruebas de usabilidad y corrección de errores (QA).
*   Optimización de rendimiento.
*   Preparación para el despliegue en tiendas de aplicaciones.
