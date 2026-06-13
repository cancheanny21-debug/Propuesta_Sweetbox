# Análisis Detallado de Interfaz de Usuario (UI/UX) - SweetBox

Este documento desglosa el análisis profundo de la propuesta gráfica para la aplicación SweetBox, basado en los mockups proporcionados.

## 1. Paleta de Colores y Estilo Visual
La aplicación utiliza un diseño **Glassmorphism** y **Soft UI**, enfocado en transmitir frescura, alegría y un tono amigable, ideal para la venta de postres.

*   **Color Primario (Acciones principales):** Verde Menta / Esmeralda Claro (Aprox. `#00C896`). Se usa en botones de "Crear Cuenta", "Proceder al Pago" e iconos activos.
*   **Colores Secundarios (Gradientes y Fondos):** 
    *   Rosa Suave / Durazno (Aprox. `#FFB6C1`).
    *   Gradiente Superior: De Verde Menta a Rosa Suave, creando una transición vibrante pero limpia.
*   **Fondos (Background):** Blanco puro y gris perla muy claro para hacer resaltar las tarjetas (Cards) de los productos.
*   **Tipografía:** Sans-serif redondeada y moderna (estilo *Quicksand*, *Nunito* o *Poppins*), lo que refuerza el tono amigable y legible.

## 2. Componentes de UI Globales
*   **Tarjetas (Cards):** Bordes muy redondeados (border-radius de aprox. 15-20px), fondo blanco, con una sombra suave (Drop Shadow) para dar efecto de elevación.
*   **Botones (Buttons):** Estilo "Pill" (píldora, bordes completamente redondeados). Los principales son sólidos (Verde Menta con texto blanco) y los secundarios son delineados o blancos con texto oscuro.
*   **Navegación Inferior (Bottom Navigation Bar):** Fondo blanco continuo. Los íconos inactivos son de línea fina en color gris oscuro. El ícono de la pantalla activa cambia a Verde Menta e incluye la etiqueta de texto debajo.

---

## 3. Desglose de Pantallas (Screens)

### Pantalla 1: Registro / Bienvenida (Welcome)
*   **Fondo:** Destaca un elemento decorativo de postres reales difuminados alrededor del dispositivo, mientras la pantalla en sí tiene un degradado suave de blanco a rosa en la parte inferior.
*   **Logo:** Ilustración de una caja de regalo turquesa de donde salen varios dulces (cupcakes, donas, helado). Título "Welcome to SweetBox" en texto oscuro.
*   **Acciones:** 
    *   Botón principal sólido "Crear Cuenta".
    *   Botón secundario blanco "Iniciar Sesión".
    *   Botones circulares pequeños para registro social: Facebook (Azul), Twitter (Celeste), Google+ (Rojo).

### Pantalla 2: Catálogo de Postres (Home/Catalog)
*   **Cabecera (Header):** Fondo con el gradiente de la marca. Incluye una barra de búsqueda blanca tipo píldora con un icono de lupa a la izquierda y un texto placeholder ("Buscar tu postre ideal..."). A la derecha, un icono de ajustes para filtros avanzados.
*   **Categorías Rápidas:** Fila horizontal con iconos ilustrados sobre fondos circulares pastel para: Cupcakes, Pasteles, Galletas, Brownies.
*   **Filtros Secundarios:** Dropdowns o selectores en texto ("Filtros", "Ocasión", "Precio") acompañados de un chevron hacia abajo.
*   **Grid de Productos:** Disposición en 2 columnas. Cada tarjeta incluye:
    *   Imagen destacada del postre abarcando la mitad superior.
    *   Icono de "Me gusta" (corazón) superpuesto en la esquina superior derecha.
    *   Título del postre (ej. "Personalized Rainbow Cake").
    *   Calificación por estrellas (5 estrellas doradas).
    *   Precio destacado en negrita.

### Pantalla 3: Mi Carrito (Cart)
*   **Cabecera:** Botón de retroceso ("<") alineado a la izquierda, título centrado "Carrito", fondo degradado menta-rosa.
*   **Tarjeta del Producto:** 
    *   Imagen en miniatura del lado izquierdo.
    *   Atributos personalizados listados (Sabor, Relleno, Mensaje).
    *   Control de cantidad: Iconos de menos (`-`) y más (`+` en círculo verde), con el número en el centro.
*   **Resumen de Costos:** Alineación justificada mostrando "Subtotal", "Envío" y "Total" (el total en fuente más grande o negrita).
*   **Call to Action:** Botón verde grande "Proceder al Pago", seguido de un texto de confianza con icono de check: "Recibirás tu pedido pronto."

### Pantalla 4: Seguimiento de Pedido / Notificaciones (Tracking)
*   **Cabecera:** Ícono de regresar, título "Notificaciones", y un icono de campana a la derecha con un *badge* de notificación rojo.
*   **Tarjeta de Estado Superior:** Tarjeta amarilla pastel con un ícono de motocicleta, indicando "¡Tu pedido está en camino!".
*   **Mapa:** Sección visual que muestra una ruta trazada desde el negocio (punto verde de origen) hasta el repartidor (ícono de camión).
*   **Línea de Tiempo (Tracker):** 
    *   Una barra de progreso horizontal con 4 nodos: Pedido Confirmado, En Preparación, En Camino, Entregado.
    *   La línea y los puntos se colorean de verde menta según el avance.
    *   Incluye tiempo estimado ("Estimado: 25 min").
*   **Info Adicional:** Muestra método de pago oculto ("Visa ****1234") y estado de la orden.
*   **Botón Final:** "Calificar Vendedor" en estilo secundario (blanco con borde).
