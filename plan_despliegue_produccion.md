# 🚀 Plan de Despliegue en Producción — Backend SweetBox
**Versión:** 1.0 | **Fecha:** Julio 2026 | **Estado:** Planificación

---

## 1. Resumen Ejecutivo

Este documento describe el plan paso a paso para llevar el backend de **SweetBox** desde el entorno de desarrollo local hasta un servidor de producción accesible públicamente desde la app móvil (React + Capacitor / Android).

El backend consiste en:
- **API REST:** Node.js + Express (puerto 3000)
- **Base de datos:** MySQL (`sweetbox_db`)
- **Autenticación:** JWT con `jsonwebtoken` + `bcryptjs`
- **Variables sensibles:** gestionadas con `dotenv`

---

## 2. Comparativa de Opciones de Hosting

| Criterio | VPS (Recomendado) | Hosting Compartido | PaaS (Railway / Render) |
|---|---|---|---|
| **Control total** | ✅ Sí | ❌ No | ⚠️ Parcial |
| **MySQL personalizado** | ✅ Sí | ⚠️ Limitado | ✅ Sí (addon) |
| **Node.js nativo** | ✅ Sí | ❌ Rara vez | ✅ Sí |
| **Precio mensual** | ~$5–15 USD | ~$3–8 USD | Gratis–$10 USD |
| **Escalabilidad** | ✅ Alta | ❌ Baja | ✅ Media |
| **Dificultad** | ⚠️ Media | ✅ Baja | ✅ Baja |
| **SSL/HTTPS** | ✅ Let's Encrypt | ✅ Incluido | ✅ Automático |
| **PM2 / proceso persistente** | ✅ Sí | ❌ No | ✅ Automático |

> **Recomendación:** Para SweetBox se recomienda un **VPS con Ubuntu 22.04 LTS** (DigitalOcean, Hostinger VPS, Contabo o Linode) por su flexibilidad total con Node.js y MySQL. Si se busca simplicidad inmediata, **Railway** o **Render** son la alternativa más rápida.

---

## 3. Opción A — Despliegue en VPS (Ubuntu 22.04)

### 3.1 Proveedores Recomendados

| Proveedor | Plan mínimo recomendado | Precio aprox. |
|---|---|---|
| **DigitalOcean** | Droplet Basic 1GB RAM / 1 vCPU / 25GB SSD | ~$6 USD/mes |
| **Hostinger VPS** | KVM 1 — 1GB RAM / 1 vCPU / 20GB NVMe | ~$3–5 USD/mes |
| **Contabo** | VPS S — 8GB RAM / 4 vCPU / 50GB SSD | ~$5–7 USD/mes |
| **Linode (Akamai)** | Nanode 1GB | ~$5 USD/mes |

---

### 3.2 Requisitos del Servidor

```
Sistema Operativo: Ubuntu 22.04 LTS (64 bits)
RAM mínima:        1 GB (2 GB recomendado)
CPU:               1 vCPU
Disco:             20 GB SSD
Acceso:            SSH root o usuario sudo
Puertos abiertos:  22 (SSH), 80 (HTTP), 443 (HTTPS), 3000 (API temporal)
```

---

### 3.3 Pasos de Instalación en el VPS

#### PASO 1 — Conectarse al servidor por SSH

```bash
ssh root@<IP_DEL_SERVIDOR>
# Ejemplo:
ssh root@192.168.100.50
```

---

#### PASO 2 — Actualizar el sistema e instalar dependencias base

```bash
apt update && apt upgrade -y
apt install -y curl git ufw build-essential
```

---

#### PASO 3 — Instalar Node.js 18 LTS

```bash
# Instalar Node.js 18 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verificar instalación
node -v    # Esperado: v18.x.x
npm -v     # Esperado: 9.x o superior
```

---

#### PASO 4 — Instalar MySQL Server

```bash
apt install -y mysql-server

# Asegurar la instalación
mysql_secure_installation
# Responder: Y a todo (contraseña root fuerte, eliminar usuarios anónimos, etc.)

# Iniciar y habilitar MySQL al arranque
systemctl start mysql
systemctl enable mysql

# Verificar estado
systemctl status mysql
```

---

#### PASO 5 — Crear la base de datos y el usuario en MySQL

```sql
-- Conectarse a MySQL como root
mysql -u root -p

-- Crear la base de datos
CREATE DATABASE sweetbox_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear un usuario dedicado (NO usar root en producción)
CREATE USER 'sweetbox_user'@'localhost' IDENTIFIED BY 'TuContraseñaSegura2026!';

-- Otorgar permisos solo sobre la BD del proyecto
GRANT ALL PRIVILEGES ON sweetbox_db.* TO 'sweetbox_user'@'localhost';
FLUSH PRIVILEGES;

-- Verificar
SHOW GRANTS FOR 'sweetbox_user'@'localhost';
EXIT;
```

> ⚠️ **CAUTION:** Nunca uses el usuario `root` de MySQL en el archivo `.env` de producción. Crea siempre un usuario dedicado con permisos mínimos.

---

#### PASO 6 — Clonar el repositorio del proyecto

```bash
# Crear directorio de aplicaciones
mkdir -p /var/www
cd /var/www

# Clonar el repositorio desde GitHub
git clone https://github.com/<TU_USUARIO>/Propuesta_Sweetbox.git sweetbox
cd sweetbox/backend-api
```

---

#### PASO 7 — Instalar dependencias del backend

```bash
cd /var/www/sweetbox/backend-api
npm install --production
```

Dependencias instaladas:
- `express` ^5.2.1
- `mysql2` ^3.22.5
- `bcryptjs` ^3.0.3
- `jsonwebtoken` ^9.0.3
- `dotenv` ^17.4.2
- `cors` ^2.8.6

---

#### PASO 8 — Configurar variables de entorno (.env)

```bash
# Crear el archivo .env de PRODUCCIÓN
nano /var/www/sweetbox/backend-api/.env
```

Contenido del `.env` para producción:

```env
# ── Base de Datos ──────────────────────────────
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=sweetbox_user
DB_PASSWORD=TuContraseñaSegura2026!
DB_NAME=sweetbox_db

# ── Servidor ───────────────────────────────────
PORT=3000

# ── Autenticación JWT ──────────────────────────
# Cambiar por una clave larga y aleatoria en producción
JWT_SECRET=genera_una_clave_aleatoria_muy_larga_aqui_2026
```

> ⚠️ **WARNING:** `JWT_SECRET` debe ser una cadena aleatoria y larga (mínimo 32 caracteres). Generarla con:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

---

#### PASO 9 — Inicializar la base de datos con el esquema SQL

```bash
# Ejecutar el script de inicialización para crear las tablas
mysql -u sweetbox_user -p sweetbox_db < /var/www/sweetbox/backend-api/src/config/init.sql

# Verificar que las tablas fueron creadas
mysql -u sweetbox_user -p sweetbox_db -e "SHOW TABLES;"
```

Tablas esperadas: `Categories`, `Favorites`, `Order_Items`, `Orders`, `Products`, `Users`

---

#### PASO 10 — Instalar PM2 (Gestor de Procesos)

PM2 mantiene el servidor Node.js corriendo 24/7 y lo reinicia automáticamente si falla.

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar el backend con PM2
cd /var/www/sweetbox/backend-api
pm2 start index.js --name "sweetbox-api"

# Configurar PM2 para arrancar al reiniciar el sistema
pm2 startup
# Ejecutar el comando que PM2 indique (empieza con "sudo env PATH=...")

pm2 save

# Ver estado del proceso
pm2 status
pm2 logs sweetbox-api
```

---

#### PASO 11 — Instalar y Configurar Nginx como Proxy Inverso

Nginx redirigirá el tráfico del puerto 80/443 al puerto 3000 de Node.js.

```bash
apt install -y nginx

# Crear archivo de configuración del sitio
nano /etc/nginx/sites-available/sweetbox
```

Contenido del archivo de configuración de Nginx:

```nginx
server {
    listen 80;
    server_name api.tusitio.com;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar el sitio y deshabilitar el default
ln -s /etc/nginx/sites-available/sweetbox /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Probar la configuración
nginx -t

# Reiniciar Nginx
systemctl restart nginx
systemctl enable nginx
```

---

#### PASO 12 — Configurar HTTPS con Let's Encrypt (SSL gratuito)

> ℹ️ **IMPORTANTE:** Necesitas un **dominio propio** apuntando a la IP del VPS para usar Let's Encrypt.

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Generar certificado SSL para tu dominio
certbot --nginx -d api.tusitio.com

# Seguir las instrucciones del asistente
# Verificar renovación automática del certificado
certbot renew --dry-run
```

---

#### PASO 13 — Configurar Firewall (UFW)

```bash
# Permitir solo los puertos necesarios
ufw allow OpenSSH
ufw allow 80
ufw allow 443

# NO exponer el puerto 3000 directamente al exterior
# Activar el firewall
ufw enable
ufw status
```

---

#### PASO 14 — Verificar el Despliegue

```bash
# 1. Verificar que PM2 tiene el proceso activo
pm2 status

# 2. Verificar el endpoint de salud de la API (local)
curl http://localhost:3000/api/health
# Respuesta esperada: {"status":"OK","message":"Servidor SweetBox funcionando correctamente."}

# 3. Verificar desde fuera del servidor
curl https://api.tusitio.com/api/health
```

---

### 3.4 Actualizar el Frontend para Apuntar a Producción

Actualizar la URL base de axios para que apunte a la API pública:

```javascript
// Recomendado: usar variable de entorno de Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

Crear `frontend/.env.production`:
```env
VITE_API_URL=https://api.tusitio.com
```

Crear `frontend/.env.development`:
```env
VITE_API_URL=http://localhost:3000
```

---

## 4. Opción B — Despliegue Rápido en Railway (PaaS)

Railway es la opción más rápida si no deseas administrar un servidor manualmente.

### 4.1 Requisitos
- Cuenta en [railway.app](https://railway.app)
- Repositorio en GitHub

### 4.2 Pasos

```
1. Ir a railway.app → New Project
2. Deploy from GitHub repo → Seleccionar Propuesta_Sweetbox
3. Configurar Root Directory: backend-api
4. Railway detecta automáticamente Node.js y ejecuta `npm start`

5. Agregar base de datos:
   → New → Database → MySQL
   → Railway genera variables de conexión automáticamente

6. Configurar Variables de Entorno:
   DB_HOST     → (valor dado por Railway)
   DB_PORT     → (valor dado por Railway)
   DB_USER     → (valor dado por Railway)
   DB_PASSWORD → (valor dado por Railway)
   DB_NAME     → (valor dado por Railway)
   PORT        → 3000
   JWT_SECRET  → (generar una clave segura aleatoria)

7. Railway asigna automáticamente una URL pública HTTPS:
   https://sweetbox-api.up.railway.app
```

> **Nota:** Railway ofrece **$5 USD de crédito gratuito al mes**, suficiente para proyectos pequeños.

---

## 5. Opción C — Despliegue en Render (PaaS Gratuito)

### 5.1 Pasos

```
1. Ir a render.com → New → Web Service
2. Conectar con GitHub → Seleccionar el repositorio
3. Configurar:
   - Root Directory: backend-api
   - Build Command: npm install
   - Start Command: node index.js
   - Environment: Node

4. Agregar base de datos MySQL:
   → Usar PlanetScale (MySQL compatible) o Clever Cloud como addon externo

5. Configurar variables de entorno en el dashboard de Render.

6. Render genera una URL pública HTTPS automáticamente:
   https://sweetbox-api.onrender.com
```

> ⚠️ **Advertencia:** El plan gratuito de Render **hiberna los servicios** tras 15 min de inactividad. La primera petición tardará ~30 segundos. Para producción real, considera el plan pagado (~$7 USD/mes).

---

## 6. Checklist de Despliegue

### Antes del Despliegue

- [ ] Revisar y actualizar `JWT_SECRET` a un valor seguro y único
- [ ] Verificar que `.env` está en `.gitignore` y **nunca se sube a GitHub**
- [ ] Cambiar `DB_USER` de `root` a un usuario dedicado con permisos mínimos
- [ ] Probar todos los endpoints de la API localmente con Postman/Thunder Client
- [ ] Asegurar que `init.sql` crea todas las tablas correctamente
- [ ] Actualizar la configuración de CORS en `index.js` para el origen del frontend

### Durante el Despliegue

- [ ] Servidor conectado y accesible por SSH
- [ ] Node.js 18 LTS instalado y verificado
- [ ] MySQL instalado, seguro y con usuario dedicado creado
- [ ] Base de datos `sweetbox_db` creada y esquema inicializado
- [ ] Dependencias del backend instaladas (`npm install --production`)
- [ ] Archivo `.env` de producción configurado correctamente
- [ ] PM2 corriendo el proceso `sweetbox-api`
- [ ] Nginx configurado como proxy inverso
- [ ] SSL/HTTPS habilitado con Let's Encrypt
- [ ] Firewall UFW activo (puertos 22, 80, 443 únicamente)

### Después del Despliegue

- [ ] `GET /api/health` responde correctamente desde internet
- [ ] `POST /api/auth/register` crea usuarios en la BD de producción
- [ ] `POST /api/auth/login` devuelve JWT válido
- [ ] `GET /api/products` retorna productos con el token correcto
- [ ] `POST /api/orders` crea pedidos con transacción en la BD
- [ ] Frontend actualizado con la URL de la API de producción (`VITE_API_URL`)
- [ ] App compilada con `npm run build` + `npx cap sync android` apuntando a producción
- [ ] Prueba en dispositivo Android físico con la URL pública

---

## 7. Configuración de CORS para Producción

Actualizar `backend-api/index.js` para restringir el CORS solo al origen del frontend en producción:

```javascript
// index.js — Configuración CORS para producción
const corsOptions = {
  origin: [
    'http://localhost:5173',           // Desarrollo local Vite
    'capacitor://localhost',           // App Android (Capacitor)
    'https://tudominiofrontend.com',   // Frontend web en producción (si aplica)
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
```

---

## 8. Seguridad Adicional para Producción

| Aspecto | Acción requerida |
|---|---|
| **JWT_SECRET** | Cambiar a una clave aleatoria de 64+ caracteres (`crypto.randomBytes`) |
| **MySQL root** | Deshabilitar login remoto de root en MySQL |
| **Contraseñas BD** | Usar contraseñas fuertes (mayúsculas, números, símbolos) |
| **HTTPS** | Obligatorio para producción (Let's Encrypt o certificado pago) |
| **Rate Limiting** | Instalar `express-rate-limit` para proteger endpoints de auth |
| **Helmet.js** | Instalar `helmet` para cabeceras HTTP seguras |
| **Logs** | PM2 guarda logs en `/root/.pm2/logs/` — revisar periódicamente |
| **Backups BD** | Configurar `mysqldump` automático diario con cron |

### Instalar middlewares de seguridad adicionales:

```bash
cd /var/www/sweetbox/backend-api
npm install helmet express-rate-limit
```

```javascript
// Agregar en index.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20,                   // máximo 20 intentos por IP
  message: { error: 'Demasiados intentos. Intenta en 15 minutos.' }
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

---

## 9. Mantenimiento y Actualizaciones

### Actualizar el backend tras cambios en el código

```bash
# En el servidor VPS
cd /var/www/sweetbox

# Traer los últimos cambios del repositorio
git pull origin main

# Instalar nuevas dependencias (si las hay)
cd backend-api
npm install --production

# Reiniciar el proceso con PM2 (sin tiempo de inactividad)
pm2 reload sweetbox-api

# Verificar estado
pm2 status
pm2 logs sweetbox-api --lines 20
```

### Comandos útiles de PM2

```bash
pm2 status                    # Ver todos los procesos
pm2 logs sweetbox-api         # Ver logs en tiempo real
pm2 restart sweetbox-api      # Reiniciar el proceso
pm2 stop sweetbox-api         # Detener el proceso
pm2 delete sweetbox-api       # Eliminar el proceso
pm2 monit                     # Monitor en tiempo real (CPU, RAM)
```

### Backup automático de la base de datos

```bash
# Backup manual
mysqldump -u sweetbox_user -p sweetbox_db > backup_$(date +%Y%m%d).sql

# Backup automático diario a las 2:00 AM con cron
crontab -e
# Agregar esta línea:
0 2 * * * mysqldump -u sweetbox_user -pTuContraseña sweetbox_db > /var/backups/sweetbox_$(date +\%Y\%m\%d).sql
```

---

## 10. Diagrama de Arquitectura en Producción

```
┌──────────────────────────────────────────┐
│         DISPOSITIVO ANDROID              │
│   React.js + Capacitor (APK)             │
│   Axios → https://api.tusitio.com        │
└────────────────┬─────────────────────────┘
                 │ HTTPS (443)
                 ▼
┌──────────────────────────────────────────┐
│              VPS / SERVIDOR              │
│                                          │
│  ┌─────────────────────────────────┐     │
│  │  Nginx (Puerto 80/443)          │     │
│  │  Proxy Inverso + SSL/TLS        │     │
│  └──────────────┬──────────────────┘     │
│                 │ localhost:3000          │
│  ┌──────────────▼──────────────────┐     │
│  │  PM2 → Node.js + Express        │     │
│  │  Backend API SweetBox           │     │
│  │  index.js (Puerto 3000)         │     │
│  └──────────────┬──────────────────┘     │
│                 │ mysql2 Pool (TCP)       │
│  ┌──────────────▼──────────────────┐     │
│  │  MySQL Server (Puerto 3306)     │     │
│  │  sweetbox_db                    │     │
│  │  Usuario: sweetbox_user         │     │
│  └─────────────────────────────────┘     │
│                                          │
│  Firewall UFW: 22, 80, 443 únicamente   │
└──────────────────────────────────────────┘
```

---

## 11. Estimación de Costos

| Servicio | Proveedor | Costo mensual |
|---|---|---|
| VPS 1GB Ubuntu | Hostinger / DigitalOcean | $3–6 USD |
| Dominio (.com) | Namecheap / Google Domains | ~$1 USD/mes |
| SSL | Let's Encrypt | **Gratis** |
| MySQL | En el mismo VPS | **Gratis** |
| **Total mínimo** | | **~$4–7 USD/mes** |

> **Tip:** Si el presupuesto es limitado, **Railway** es la opción más económica para empezar: incluye base de datos MySQL y URL pública HTTPS por ~$0–5 USD al mes.

---

*Documento generado para el proyecto SweetBox — Plan de Despliegue Backend v1.0 — Julio 2026*
