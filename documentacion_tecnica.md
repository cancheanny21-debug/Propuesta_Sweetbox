# 🛠️ Documentación Técnica — SweetBox

> **Versión:** 2.0.0  
> **Proyecto:** SweetBox — App Móvil de Venta de Postres  
> **Responsable:** Anny Liseth Canche Montaño  
> **Institución:** Alberto Enríquez | Desarrollo de Software  
> **Stack actualizado:** React.js + Capacitor + MySQL

---

## 1. Descripción General del Sistema

**SweetBox** es una aplicación móvil híbrida diseñada para facilitar la compra y gestión de pedidos de postres personalizados. Se construye con **React.js** como framework de interfaz, **Capacitor** para empaquetar la app como nativa en Android, y **MySQL** como base de datos relacional gestionada a través de un backend **Node.js + Express**.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión recomendada |
|------|-----------|-------------------|
| **Frontend / UI** | React.js | 18.x |
| **Empaquetado Móvil** | Capacitor | 5.x |
| **Lenguaje** | JavaScript / JSX | ES2022+ |
| **Estilos** | CSS Modules / Tailwind CSS | 3.x |
| **Backend / API REST** | Node.js + Express | Node 20 LTS |
| **Base de Datos** | MySQL | 8.x |
| **ORM** | Sequelize | 6.x |
| **Autenticación** | JWT (JSON Web Tokens) | - |
| **Notificaciones Push** | Capacitor Push Notifications | 5.x |
| **IDE** | VS Code + Android Studio (para build) | - |
| **Control de versiones** | Git + GitHub | - |

---

## 3. Arquitectura del Proyecto

Se adopta una arquitectura **cliente-servidor** con separación clara entre frontend React (empaquetado con Capacitor) y backend REST API en Node.js.

```
sweetbox/
├── frontend/                          # Proyecto React.js
│   ├── public/
│   ├── src/
│   │   ├── main.jsx                   # Punto de entrada React
│   │   ├── App.jsx                    # Rutas principales
│   │   ├── assets/                    # Imágenes, íconos
│   │   ├── components/                # Componentes reutilizables
│   │   │   ├── Navbar/
│   │   │   ├── ProductCard/
│   │   │   ├── CartItem/
│   │   │   ├── OrderStepper/
│   │   │   └── NotificationBanner/
│   │   ├── pages/                     # Pantallas principales
│   │   │   ├── Welcome/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Catalog/
│   │   │   ├── Cart/
│   │   │   ├── Tracking/
│   │   │   └── Profile/
│   │   ├── services/                  # Llamadas a la API REST
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── orderService.js
│   │   │   └── notificationService.js
│   │   ├── store/                     # Estado global (Context API o Redux)
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   └── utils/
│   │       ├── api.js                 # Instancia de Axios con baseURL
│   │       └── helpers.js
│   ├── capacitor.config.ts            # Configuración de Capacitor
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # API REST Node.js + Express
│   ├── src/
│   │   ├── app.js                     # Punto de entrada Express
│   │   ├── config/
│   │   │   └── db.js                  # Conexión MySQL con Sequelize
│   │   ├── models/                    # Modelos Sequelize
│   │   │   ├── User.js
│   │   │   ├── Postre.js
│   │   │   ├── Order.js
│   │   │   └── OrderItem.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── postres.routes.js
│   │   │   └── orders.routes.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── postres.controller.js
│   │   │   └── orders.controller.js
│   │   └── middleware/
│   │       └── verifyToken.js         # Middleware JWT
│   └── package.json
```

---

## 4. Base de Datos MySQL — Esquema Relacional

### Tabla: `usuarios`
```sql
CREATE TABLE usuarios (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100)        NOT NULL,
  email        VARCHAR(150) UNIQUE NOT NULL,
  password     VARCHAR(255)        NOT NULL,  -- bcrypt hash
  foto_perfil  VARCHAR(500),
  metodo_login ENUM('email','google') DEFAULT 'email',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: `postres`
```sql
CREATE TABLE postres (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150)        NOT NULL,
  categoria   ENUM('Cupcakes','Pasteles','Galletas','Brownies') NOT NULL,
  descripcion TEXT,
  precio      DECIMAL(8,2)        NOT NULL,
  imagen_url  VARCHAR(500),
  calificacion DECIMAL(2,1) DEFAULT 0.0,
  disponible  TINYINT(1) DEFAULT 1
);
```

### Tabla: `opciones_postre`
```sql
CREATE TABLE opciones_postre (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  postre_id  INT NOT NULL,
  tipo       ENUM('sabor','relleno') NOT NULL,
  valor      VARCHAR(100) NOT NULL,
  FOREIGN KEY (postre_id) REFERENCES postres(id) ON DELETE CASCADE
);
```

### Tabla: `pedidos`
```sql
CREATE TABLE pedidos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id   INT NOT NULL,
  subtotal     DECIMAL(8,2) NOT NULL,
  envio        DECIMAL(8,2) DEFAULT 5.00,
  total        DECIMAL(8,2) NOT NULL,
  metodo_pago  VARCHAR(50),
  estado       ENUM('Confirmado','EnPreparacion','EnCamino','Entregado') DEFAULT 'Confirmado',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

### Tabla: `pedido_items`
```sql
CREATE TABLE pedido_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id  INT NOT NULL,
  postre_id  INT NOT NULL,
  sabor      VARCHAR(100),
  relleno    VARCHAR(100),
  mensaje    VARCHAR(255),
  cantidad   INT DEFAULT 1,
  precio_unit DECIMAL(8,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (postre_id) REFERENCES postres(id)
);
```

### Tabla: `favoritos`
```sql
CREATE TABLE favoritos (
  usuario_id INT NOT NULL,
  postre_id  INT NOT NULL,
  PRIMARY KEY (usuario_id, postre_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (postre_id)  REFERENCES postres(id)  ON DELETE CASCADE
);
```

---

## 5. API REST — Endpoints Principales

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | Iniciar sesión → retorna JWT |
| `GET`  | `/api/auth/me` | Obtener perfil (requiere token) |

### Postres / Catálogo
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET`  | `/api/postres` | Listar todos (con filtros por categoría, precio) |
| `GET`  | `/api/postres/:id` | Detalle de un postre |
| `POST` | `/api/postres` | Crear postre (admin) |
| `PUT`  | `/api/postres/:id` | Actualizar postre (admin) |

### Pedidos
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/orders` | Crear nuevo pedido |
| `GET`  | `/api/orders/:id` | Estado del pedido |
| `GET`  | `/api/orders/user/:userId` | Historial del usuario |
| `PATCH`| `/api/orders/:id/status` | Actualizar estado (admin) |

### Favoritos
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/favorites` | Agregar a favoritos |
| `DELETE`| `/api/favorites/:postreId` | Quitar de favoritos |
| `GET`  | `/api/favorites` | Listar favoritos del usuario |

---

## 6. Flujo de Autenticación JWT

```
Usuario → POST /api/auth/login (email + password)
    ↓
Backend verifica password con bcrypt
    ↓
Genera JWT (payload: userId, email, exp: 7d)
    ↓
Frontend guarda token en localStorage / Capacitor Preferences
    ↓
Cada request incluye: Authorization: Bearer <token>
    ↓
Middleware verifyToken.js valida el token en rutas protegidas
```

---

## 7. Configuración de Capacitor

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sweetbox.app',
  appName: 'SweetBox',
  webDir: 'dist',           // Output de Vite
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
```

**Comandos Capacitor:**
```bash
# Agregar plataforma Android
npx cap add android

# Sincronizar cambios de React al proyecto Android
npm run build && npx cap sync

# Abrir en Android Studio para compilar APK
npx cap open android
```

---

## 8. Paleta de Colores

| Nombre | HEX | Uso |
|--------|-----|-----|
| Rosa Pastel Principal | `#F48FB1` | Botones primarios, acentos |
| Verde Menta CTA | `#4CAF92` | Botón "Proceder al Pago", activo |
| Gradiente Top | `#A8EDEA → #FED6E3` | Headers de pantallas |
| Fondo Claro | `#FFF9FB` | Background general |
| Texto Principal | `#3D2C2C` | Títulos y cuerpo |
| Texto Secundario | `#9E9E9E` | Precios secundarios |
| Estrella Rating | `#FFB300` | Sistema de calificación |

---

## 9. Dependencias del Proyecto

### Frontend (`frontend/package.json`)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "@capacitor/core": "^5.x",
    "@capacitor/android": "^5.x",
    "@capacitor/push-notifications": "^5.x",
    "@capacitor/preferences": "^5.x",
    "react-icons": "^5.x",
    "react-hot-toast": "^2.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x"
  }
}
```

### Backend (`backend/package.json`)
```json
{
  "dependencies": {
    "express": "^4.x",
    "sequelize": "^6.x",
    "mysql2": "^3.x",
    "jsonwebtoken": "^9.x",
    "bcryptjs": "^2.x",
    "cors": "^2.x",
    "dotenv": "^16.x",
    "multer": "^1.x"
  },
  "devDependencies": {
    "nodemon": "^3.x"
  }
}
```

---

## 10. Variables de Entorno (`backend/.env`)

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sweetbox_db
DB_USER=root
DB_PASSWORD=tu_password

JWT_SECRET=tu_clave_secreta_muy_larga
JWT_EXPIRES_IN=7d

PORT=3000
```

---

## 11. Configuración del Entorno de Desarrollo

```bash
# ── BACKEND ──────────────────────────────────────
# 1. Instalar dependencias del backend
cd backend && npm install

# 2. Crear base de datos MySQL
mysql -u root -p -e "CREATE DATABASE sweetbox_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. Ejecutar migraciones / sync Sequelize
node src/app.js   # Sequelize sync({ force: false }) al arrancar

# 4. Iniciar servidor backend
npm run dev       # nodemon src/app.js → http://localhost:3000

# ── FRONTEND ─────────────────────────────────────
# 5. Instalar dependencias del frontend
cd frontend && npm install

# 6. Iniciar servidor de desarrollo React
npm run dev       # Vite → http://localhost:5173

# 7. Build para Capacitor
npm run build

# 8. Sincronizar con Android y abrir Android Studio
npx cap sync && npx cap open android
```

---

## 12. Consideraciones de Seguridad

- Las contraseñas se almacenan como **hash bcrypt** (nunca en texto plano).
- El **JWT** expira en 7 días; implementar refresh token en versiones futuras.
- Las **Firestore Security Rules** no aplican — en su lugar, usar middleware `verifyToken.js` en todas las rutas protegidas de Express.
- Los datos de pago se gestionan a través de un proveedor externo (Stripe, PayU); nunca se almacenan números de tarjeta en MySQL.
- Configurar **CORS** en Express para aceptar únicamente el origen de la app.
- Usar **HTTPS** en producción con certificado SSL.

---

*Documentación técnica versión 2.0 — SweetBox | Junio 2026*
