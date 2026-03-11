# 🏠 Elite Inmobiliaria — Next.js + Supabase

Sitio web completo para inmobiliaria de lujo con **Next.js 14**, **Tailwind CSS** y **Supabase (PostgreSQL)** como base de datos. Panel admin protegido con JWT.

---

## 🗄️ Paso 1 — Crear las tablas en Supabase

1. Ve a tu proyecto Supabase → **SQL Editor** → **New query**
2. Abre el archivo `supabase-setup.sql` que viene en este proyecto
3. Pega todo el contenido y haz clic en **Run**

Esto crea las tablas `propiedades` y `blog_posts` con datos de ejemplo listos.

---

## 🚀 Paso 2 — Subir a GitHub

```bash
git init
git add .
git commit -m "🏠 Elite Inmobiliaria + Supabase"
git remote add origin https://github.com/TU-USUARIO/inmobiliaria-elite.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Paso 3 — Variables de entorno en Vercel

Las variables de Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, etc.) ya fueron conectadas automáticamente cuando enlazaste Supabase a tu proyecto en Vercel.

Solo agrega las 3 variables del admin en **Vercel → Settings → Environment Variables**:

| Variable | Valor |
|----------|-------|
| `ADMIN_USERNAME` | El usuario que quieras |
| `ADMIN_PASSWORD` | Una contraseña segura |
| `JWT_SECRET` | Una frase larga aleatoria |

---

## 🎉 Paso 4 — Deploy

Haz clic en **Deploy** en Vercel. ¡Listo!

---

## 💻 Desarrollo local

```bash
npm install
```

Crea `.env.local` con las variables de Supabase (cópialas desde Vercel → Settings → Environment Variables) más las del admin:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=secreto_local_desarrollo

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```bash
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin  (usuario: admin / contraseña: admin123)
```

---

## 📁 Estructura

```
├── app/               # Páginas públicas + admin + API
├── components/        # Navbar, Footer, cards, formularios
├── lib/
│   ├── supabase.ts    # Cliente Supabase (server-side)
│   ├── storage.ts     # CRUD de propiedades y blog
│   └── auth.ts        # JWT auth
├── middleware.ts      # Protección de rutas /admin/*
└── supabase-setup.sql # ← EJECUTA ESTO PRIMERO en Supabase
```
