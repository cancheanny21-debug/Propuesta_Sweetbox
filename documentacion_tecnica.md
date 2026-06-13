# Documentación Técnica: SweetBox

## 1. Arquitectura del Sistema
SweetBox es una aplicación móvil desarrollada con un enfoque de cliente-servidor, donde la aplicación móvil actúa como cliente y se conecta a través de una API RESTful a un backend propio con una base de datos relacional.

## 2. Stack Tecnológico
*   **Frontend Mobile:** React.js empaquetado con Capacitor para móviles.
*   **Backend:** API RESTful (ej. Node.js/Express o PHP).
*   **Base de Datos:** MySQL.
*   **Autenticación:** JWT o sistema propio en el backend.
*   **Almacenamiento (Imágenes):** Servidor propio o servicio cloud (ej. AWS S3).
*   **Entorno de Desarrollo (IDE):** VS Code.

## 3. Análisis Detallado de la Interfaz de Usuario (UI/UX)
Para mantener esta documentación limpia, el análisis profundo de colores, componentes, flujos de pantalla y elementos visuales (basado en los mockups) ha sido extraído a un documento dedicado.

👉 **Por favor revisa el archivo detallado aquí:** [analisis_ui.md](file:///c:/Users/ANNY/Documents/GitHub/Propuesta_Sweetbox/analisis_ui.md)

## 4. Estructura de Base de Datos MySQL (Propuesta)
*   **Tabla Users:** `id` (PK), `nombre`, `correo`, `password`, `created_at`.
*   **Tabla Products:** `id` (PK), `nombre`, `categoria_id` (FK), `precio`, `rating`, `url_imagen`, `ingredientes`.
*   **Tabla Orders:** `id` (PK), `user_id` (FK), `total`, `estado`, `metodo_pago`, `direccion`, `created_at`.
*   **Tabla Order_Items:** `id` (PK), `order_id` (FK), `product_id` (FK), `cantidad`, `precio_unitario`.
*   **Tabla Favorites:** `user_id` (FK), `product_id` (FK).
