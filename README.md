# 🏠 Elite Inmobiliaria — Next.js + Vercel KV

Sitio web completo para inmobiliaria de lujo con **Next.js 14**, **Tailwind CSS** y **Vercel KV (Redis)** como base de datos. Panel de administración protegido con JWT.

---

## 🚀 Despliegue en Vercel (paso a paso)

### Paso 1 — Subir a GitHub

```bash
git init
git add .
git commit -m "🏠 Elite Inmobiliaria"
git remote add origin https://github.com/TU-USUARIO/inmobiliaria-elite.git
git branch -M main
git push -u origin main
```

### Paso 2 — Crear proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Importa tu repositorio de GitHub
3. Vercel detecta Next.js automáticamente — no cambies nada
4. **No hagas deploy todavía** — primero crea el KV Store

### Paso 3 — Crear Vercel KV Store ⚡

1. En el panel de Vercel, ve a **Storage** → **Create Database**
2. Selecciona **KV** → dale un nombre (ej: `elite-kv`) → **Create**
3. Una vez creado, haz clic en **Connect to Project** y selecciona tu proyecto
4. Vercel agrega automáticamente las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN` a tu proyecto

### Paso 4 — Variables de entorno

En Vercel → tu proyecto → **Settings** → **Environment Variables**, agrega:

| Variable | Valor |
|----------|-------|
| `ADMIN_USERNAME` | `admin` (o el que prefieras) |
| `ADMIN_PASSWORD` | Una contraseña segura |
| `JWT_SECRET` | Una cadena larga aleatoria |

> Las variables `KV_REST_API_*` ya fueron agregadas automáticamente en el paso anterior.

### Paso 5 — Deploy 🎉

Haz clic en **Deploy**. En 2-3 minutos tu sitio estará en vivo.

---

## 💻 Desarrollo local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables locales

Ve a Vercel → Storage → tu KV Store → pestaña **.env.local** → copia las variables.

Crea el archivo `.env.local`:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=mi_secreto_local_desarrollo

KV_REST_API_URL=https://xxxxx.kv.vercel-storage.com
KV_REST_API_TOKEN=xxxxxxxxxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxxxxxxxxx
```

### 3. Ejecutar

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🔐 Panel Admin

URL: `/admin`  
Credenciales por defecto: `admin` / `admin123`

Desde el panel puedes:
- 📊 Ver estadísticas en el Dashboard
- 🏠 Crear, editar y eliminar propiedades
- 📝 Escribir, publicar y eliminar artículos del blog

---

## 📁 Estructura

```
├── app/
│   ├── page.tsx              # Inicio
│   ├── ventas/               # Propiedades en venta
│   ├── rentas/               # Propiedades en renta
│   ├── servicios/            # Servicios
│   ├── blog/                 # Blog SEO
│   ├── contacto/             # Formulario contacto
│   ├── propiedad/[id]/       # Detalle de propiedad
│   ├── admin/                # Panel admin (protegido)
│   └── api/                  # API Routes
├── components/               # Navbar, Footer, Cards...
├── lib/
│   ├── storage.ts            # Vercel KV (base de datos)
│   └── auth.ts               # JWT auth
└── middleware.ts             # Protección de rutas admin
```

---

## 🌱 Datos iniciales

El primer arranque carga automáticamente 4 propiedades y 3 artículos de blog de ejemplo. Puedes editarlos o eliminarlos desde el panel admin.

---

## 🛡️ Seguridad

- Tokens JWT almacenados en cookies `httpOnly` (no accesibles desde JS)
- Middleware protege todas las rutas `/admin/*`
- Nunca subas `.env.local` a Git (ya está en `.gitignore`)
