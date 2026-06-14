# 🧁 SweetBox

SweetBox es una aplicación móvil moderna y dinámica diseñada para facilitar la venta y gestión de pedidos de postres personalizados. Permite a pequeños emprendimientos llegar a más clientes, ofreciendo un catálogo organizado, carrito de compras, y seguimiento en tiempo real.

---

## 🛠 Stack Tecnológico

El proyecto está desarrollado con una arquitectura Cliente-Servidor moderna:

- **Frontend (Mobile App):** React.js + Vite.
- **Empaquetado Móvil:** Capacitor (para compilar a Android/iOS).
- **Backend (API):** Node.js con Express.
- **Base de Datos:** MySQL.
- **Estilos:** Vanilla CSS con enfoque en diseño Glassmorphism y Soft UI.

---

## 📁 Estructura del Proyecto

El repositorio está dividido en dos grandes carpetas:

### 1. `frontend/` (Frontend)
Contiene todo el código de la interfaz de usuario en React.
- `src/pages/`: Vistas completas (Ej. Pantalla de Bienvenida, Catálogo).
- `src/components/`: Componentes reutilizables.
- `src/assets/`: Imágenes, iconos y logos.

### 2. `backend-api/` (Backend)
Servidor RESTful en Node.js que expone los datos a la aplicación móvil.
- `src/config/`: Conexión a la base de datos MySQL e inicialización (`init.sql`, `setupDb.js`).
- `src/routes/`: Definición de las rutas/endpoints de la API.
- `src/controllers/`: Lógica de negocio.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

### Requisitos Previos
- [Node.js](https://nodejs.org/) instalado.
- Servidor MySQL ejecutándose en el puerto 3306 (Ej. a través de XAMPP, WAMP o Docker).

### Configuración de la Base de Datos
1. Ve a la carpeta `backend-api/`:
   ```bash
   cd backend-api
   ```
2. Asegúrate de que el archivo `.env` exista y tenga tus credenciales (por defecto apunta a root sin contraseña).
3. Instala las dependencias y corre el script de configuración:
   ```bash
   npm install
   node src/config/setupDb.js
   ```

### Ejecutar el Backend
```bash
cd backend-api
npm start # o bien: node index.js
```
El servidor escuchará en `http://localhost:3000`.

### Ejecutar el Frontend
Abre otra terminal y ejecuta:
```bash
cd frontend
npm install
npm run devm
```
La aplicación móvil se abrirá en modo web en `http://localhost:5173`.

---

## 📅 Estado de Desarrollo (Sprints)
- ✅ **Sprint 1:** Configuración inicial de repositorios, BD MySQL y UI de Bienvenida.
- ✅ **Sprint 2:** Catálogo de Postres y visualización dinámica desde BD.
- 🚧 **Sprint 3:** Mi Carrito (gestión de estados y lógica de cobros).
- ⏳ **Sprint 4:** Seguimiento de pedidos, Pasarela de Pagos.
- ⏳ **Sprint 5:** QA y despliegue final.
