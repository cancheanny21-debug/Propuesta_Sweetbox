# 🚀 Plan de Migración a Hosting — SweetBox

**Proyecto:** Propuesta SweetBox  
**Stack:** Node.js (Express) + MySQL + React (Vite)  
**Fecha:** Julio 2026  

---

## 📋 Resumen del Proyecto Actual

| Componente       | Tecnología          | Estado local            |
|------------------|---------------------|-------------------------|
| **Backend API**  | Node.js + Express   | `http://localhost:3000` |
| **Base de datos**| MySQL (MariaDB)     | `127.0.0.1:3306`        |
| **Frontend**     | React + Vite        | `http://localhost:5173` |

### Archivos con URLs hardcodeadas (`localhost:3000`)

Los siguientes archivos del frontend necesitarán actualizarse tras la migración:

| Archivo | Endpoint usado |
|---|---|
| `src/pages/Register.jsx` | `POST /api/auth/register` |
| `src/pages/Login.jsx` | `POST /api/auth/login` |
| `src/pages/Profile.jsx` | `GET /api/orders` |
| `src/pages/ProfileEdit.jsx` | `PUT /api/auth/profile` |
| `src/pages/Checkout.jsx` | `POST /api/orders` |
| `src/pages/Catalog.jsx` | `GET /api/products` |
| `src/context/FavoritesContext.jsx` | `GET/POST/DELETE /api/favorites` |

---

## 🎯 Opciones de Hosting Recomendadas

### Opción A — Railway ⭐ Recomendado para principiantes
> Gratuito hasta cierto límite, muy fácil de conectar con GitHub, incluye MySQL.

| | |
|---|---|
| **Backend** | Railway (Node.js) |
| **Base de datos** | Railway MySQL Plugin |
| **URL resultante** | `https://sweetbox-api.up.railway.app` |
| **Costo** | Gratis / $5 USD mes (Hobby) |

### Opción B — Render

| | |
|---|---|
| **Backend** | Render Web Service (Node.js) |
| **Base de datos** | PlanetScale o Render MySQL |
| **URL resultante** | `https://sweetbox-api.onrender.com` |
| **Costo** | Gratis con hibernación |

### Opción C — VPS (DigitalOcean / Hostinger)

| | |
|---|---|
| **Backend** | Node.js con PM2 |
| **Base de datos** | MySQL en el mismo VPS |
| **Costo** | ~$6 USD/mes |

---

## 🗄️ FASE 1 — Migración de la Base de Datos

### 1.1 Exportar la base de datos local

El archivo `sweetbox_db.sql` ya existe en el proyecto. Contiene:
- Tablas: `users`, `products`, `categories`, `orders`, `order_items`, `favorites`
- Datos iniciales de productos y categorías (25 productos)

Si tienes cambios nuevos, re-exporta desde phpMyAdmin:
```
phpMyAdmin → sweetbox_db → Exportar → SQL → Ejecutar
```
O desde terminal:
```bash
mysqldump -u root -p sweetbox_db > sweetbox_db.sql
```

### 1.2 Crear la base de datos en el hosting

#### En Railway:
1. Ir a tu proyecto en [railway.app](https://railway.app)
2. Clic en **"+ New Service"** → **"Database"** → **"MySQL"**
3. Railway genera automáticamente variables de entorno:
   - `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`
4. En el panel de Railway, ir a la base de datos → pestaña **"Query"**
5. Pegar el contenido de `sweetbox_db.sql` y ejecutar

#### En otros hostings (cPanel / Hostinger):
1. Ir a **phpMyAdmin** desde el panel de control
2. Crear base de datos: `sweetbox_db`
3. Seleccionar la base de datos → pestaña **"Importar"**
4. Subir el archivo `sweetbox_db.sql` → **Continuar**

---

## 🖥️ FASE 2 — Migración del Backend

### 2.1 Preparar el proyecto para producción

#### Cambio en `backend-api/index.js` — Configurar CORS para producción

Actualmente CORS está abierto (`app.use(cors())`). En producción se debe restringir al dominio del frontend:

```javascript
// ANTES (desarrollo):
app.use(cors());

// DESPUÉS (producción):
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

#### Crear `.env` de producción con las variables del hosting

```env
# Variables para producción en el hosting (NO subir a GitHub)
DB_HOST=<host-de-railway-o-hosting>
DB_PORT=3306
DB_USER=<usuario-db-hosting>
DB_PASSWORD=<password-db-hosting>
DB_NAME=sweetbox_db
PORT=3000
JWT_SECRET=<nueva-clave-secreta-fuerte-minimo-32-chars>
FRONTEND_URL=https://tu-frontend.vercel.app
```

> ⚠️ **IMPORTANTE:** Nunca subas el `.env` con datos de producción a GitHub.  
> Asegúrate que `.env` esté en el `.gitignore`.

#### Script de start en `backend-api/package.json`

El script ya existe correctamente:
```json
"scripts": {
  "start": "node index.js"
}
```
Railway y Render usan `npm start` automáticamente.

### 2.2 Subir el backend a Railway

1. Ir a [railway.app](https://railway.app) → **"New Project"** → **"Deploy from GitHub repo"**
2. Seleccionar el repositorio `Propuesta_Sweetbox`
3. Configurar el **Root Directory**: `backend-api`
4. En la sección **"Variables"** del servicio, agregar:

| Variable | Valor |
|---|---|
| `DB_HOST` | (copiado del plugin MySQL de Railway) |
| `DB_PORT` | `3306` |
| `DB_USER` | (usuario generado por Railway) |
| `DB_PASSWORD` | (password generado por Railway) |
| `DB_NAME` | `sweetbox_db` |
| `JWT_SECRET` | `tu_clave_super_secreta_aleatoria_larga` |
| `FRONTEND_URL` | `https://tu-frontend.vercel.app` |
| `PORT` | `3000` |

5. Railway detecta `package.json` y ejecuta `npm start` automáticamente
6. Tu API estará disponible en: `https://sweetbox-api.up.railway.app`

#### Verificar que el backend funciona en producción:
```
GET https://sweetbox-api.up.railway.app/api/health
→ { "status": "OK", "message": "Servidor SweetBox funcionando correctamente." }
```

---

## ⚛️ FASE 3 — Cambios en el Frontend

Esta es la parte más importante: reemplazar todas las URLs `localhost:3000` por la URL del hosting, sin tocar el código cada vez que cambies de entorno.

### 3.1 Crear archivos de variables de entorno de Vite

**Crear:** `frontend/.env.development`
```env
VITE_API_URL=http://localhost:3000
```

**Crear:** `frontend/.env.production`
```env
VITE_API_URL=https://sweetbox-api.up.railway.app
```

> Vite usa `.env.development` al correr `npm run dev` y `.env.production` al hacer `npm run build`.  
> Solo variables con prefijo `VITE_` son accesibles en el código del frontend.

### 3.2 Crear archivo centralizado `apiConfig.js`

**Crear:** `frontend/src/config/apiConfig.js`
```javascript
// Punto central de configuración de la API.
// Vite reemplaza VITE_API_URL automáticamente según el entorno.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_URL;
```

### 3.3 Actualizar cada archivo del frontend

Importar `API_URL` y reemplazar las URLs hardcodeadas:

#### `frontend/src/pages/Login.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- const res = await axios.post('http://localhost:3000/api/auth/login', {
+ const res = await axios.post(`${API_URL}/api/auth/login`, {
```

#### `frontend/src/pages/Register.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- await axios.post('http://localhost:3000/api/auth/register', {
+ await axios.post(`${API_URL}/api/auth/register`, {
```

#### `frontend/src/pages/Profile.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- .get('http://localhost:3000/api/orders', {
+ .get(`${API_URL}/api/orders`, {
```

#### `frontend/src/pages/ProfileEdit.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- 'http://localhost:3000/api/auth/profile',
+ `${API_URL}/api/auth/profile`,
```

#### `frontend/src/pages/Checkout.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- 'http://localhost:3000/api/orders',
+ `${API_URL}/api/orders`,
```

#### `frontend/src/pages/Catalog.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- .get('http://localhost:3000/api/products', { headers })
+ .get(`${API_URL}/api/products`, { headers })
```

#### `frontend/src/context/FavoritesContext.jsx`
```diff
+ import API_URL from '../config/apiConfig';

- const res = await axios.get('http://localhost:3000/api/favorites', {
+ const res = await axios.get(`${API_URL}/api/favorites`, {

- await axios.delete(`http://localhost:3000/api/favorites/${product.id}`, {
+ await axios.delete(`${API_URL}/api/favorites/${product.id}`, {

- 'http://localhost:3000/api/favorites',
+ `${API_URL}/api/favorites`,
```

---

## 📱 FASE 4 — Compilación del Frontend a APK (Capacitor + Android Studio)

Dado que la aplicación se distribuirá como una app móvil (APK), el proceso de despliegue del frontend varía. En lugar de subirlo a Vercel, lo compilaremos localmente:

### 4.1 Preparar el Build para Producción
Vite usará automáticamente el archivo `.env.production` cuando ejecutes el build. Asegúrate de que `VITE_API_URL` apunte a tu backend en el hosting (ej: `https://sweetbox-api.up.railway.app`).

1. En la terminal, dentro de la carpeta `frontend`, ejecuta:
   ```bash
   npm run build
   ```
   Esto generará una carpeta `dist` con los archivos estáticos listos y apuntando al servidor en producción.

### 4.2 Sincronizar con Capacitor
Una vez generado el build, debes pasar esos archivos a la plataforma de Android:

1. Ejecuta la sincronización de Capacitor:
   ```bash
   npx cap sync android
   ```
   Esto copiará el contenido de la carpeta `dist` a la carpeta nativa `android/`.

### 4.3 Compilar el APK en Android Studio
1. Abre Android Studio:
   ```bash
   npx cap open android
   ```
2. Espera a que Android Studio indexe el proyecto y resuelva las dependencias de Gradle.
3. Para generar el APK:
   - Ve al menú **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
4. Cuando termine, Android Studio mostrará un mensaje en la esquina inferior derecha. Haz clic en **locate** para encontrar tu archivo `app-debug.apk` (o genera un Signed APK para producción).

> ⚠️ **Nota sobre Android y CORS/HTTP:**
> - Capacitor hace las peticiones desde `http://localhost`. El backend ya fue modificado en la FASE 2 para permitir este origen en los CORS.
> - Android por defecto **bloquea** el tráfico HTTP (texto plano). Es obligatorio que tu backend use HTTPS (Railway y Render lo incluyen gratis por defecto). Asegúrate de que tu `VITE_API_URL` empiece con `https://`.

---

## ✅ FASE 5 — Checklist de Verificación Post-Deploy

### Backend en producción
- [ ] `GET /api/health` responde correctamente
- [ ] `POST /api/auth/login` retorna JWT token
- [ ] `GET /api/products` retorna los 25 productos
- [ ] La base de datos tiene las tablas y datos importados
- [ ] Los headers CORS permiten peticiones desde el dominio del frontend

### Frontend en producción
- [ ] La app carga sin errores en la consola del navegador
- [ ] Login funciona con usuarios existentes
- [ ] El catálogo muestra los productos
- [ ] El carrito y checkout funcionan correctamente
- [ ] Los favoritos se guardan y eliminan
- [ ] El perfil muestra el historial de pedidos

### Seguridad
- [ ] `JWT_SECRET` es una clave fuerte y única (distinta a la de desarrollo)
- [ ] Los archivos `.env` de producción **NO** están en el repositorio de GitHub
- [ ] CORS solo permite el dominio del frontend en producción

---

## 🔧 Solución de Problemas Comunes

| Problema | Causa probable | Solución |
|---|---|---|
| Error 500 en login | DB no migrada o credenciales incorrectas | Verificar variables de entorno en el hosting |
| Error CORS en el navegador | `FRONTEND_URL` mal configurada en backend | Actualizar la variable con la URL exacta de Vercel |
| "Cannot connect to DB" en Railway | El plugin MySQL no está enlazado al servicio Node | En Railway: conectar el servicio MySQL al servicio Node.js |
| Productos no cargan | Token JWT inválido o expirado | Hacer logout y volver a iniciar sesión |
| Build falla en Vercel | `VITE_API_URL` no configurada | Agregar la variable en el panel de Environment Variables de Vercel |
| App en blanco después del build | Rutas de React no configuradas para SPA | En Vercel, agregar un archivo `vercel.json` con rewrites |

### Si la app queda en blanco en Vercel (SPA Routing)

Crear `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📁 Resumen de Archivos a Crear / Modificar

```
Propuesta_Sweetbox/
├── backend-api/
│   └── index.js                      ← MODIFICAR: CORS con FRONTEND_URL
└── frontend/
    ├── .env.development               ← CREAR: VITE_API_URL=http://localhost:3000
    ├── .env.production                ← CREAR: VITE_API_URL=https://tu-api.railway.app
    ├── vercel.json                    ← CREAR: configuración SPA routing
    └── src/
        ├── config/
        │   └── apiConfig.js           ← CREAR: exporta API_URL centralizada
        ├── pages/
        │   ├── Login.jsx              ← MODIFICAR: usar API_URL
        │   ├── Register.jsx           ← MODIFICAR: usar API_URL
        │   ├── Profile.jsx            ← MODIFICAR: usar API_URL
        │   ├── ProfileEdit.jsx        ← MODIFICAR: usar API_URL
        │   ├── Checkout.jsx           ← MODIFICAR: usar API_URL
        │   └── Catalog.jsx            ← MODIFICAR: usar API_URL
        └── context/
            └── FavoritesContext.jsx   ← MODIFICAR: usar API_URL (3 ocurrencias)
```

---

*Generado automáticamente — Proyecto SweetBox — Julio 2026*
