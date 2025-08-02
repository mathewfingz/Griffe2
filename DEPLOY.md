# 🚀 Deployment en Vercel

## Prerrequisitos

1. **Cuenta en Vercel**: [vercel.com](https://vercel.com)
2. **Base de datos en la nube**: Configura una de estas opciones:
   - [Neon](https://neon.tech) (PostgreSQL) - **Recomendado**
   - [Supabase](https://supabase.com) (PostgreSQL + Features)
   - [PlanetScale](https://planetscale.com) (MySQL)
3. **Redis en la nube**: [Upstash](https://upstash.com) - **Recomendado para Vercel**
4. **Servicios externos**:
   - [Clerk.dev](https://clerk.dev) - Autenticación
   - [Stripe](https://stripe.com) - Pagos
   - [OpenAI](https://openai.com) - IA
   - [Resend](https://resend.com) - Email

## 🔧 Configuración de Servicios

### 1. Base de Datos - Neon (Recomendado)

```bash
# 1. Crear cuenta en neon.tech
# 2. Crear nuevo proyecto
# 3. Copiar connection string
# 4. Añadir ?sslmode=require al final de la URL
```

**URL de ejemplo:**
```
postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

### 2. Redis - Upstash

```bash
# 1. Crear cuenta en upstash.com
# 2. Crear nueva database Redis
# 3. Copiar UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN
```

### 3. Clerk Authentication

```bash
# 1. Crear cuenta en clerk.dev
# 2. Crear nueva aplicación
# 3. Configurar OAuth providers (Google, GitHub, etc.)
# 4. Copiar keys de la dashboard
```

### 4. Stripe Connect

```bash
# 1. Crear cuenta en stripe.com
# 2. Activar Stripe Connect en Dashboard
# 3. Configurar webhooks en modo live
# 4. Copiar keys API
```

## 🚀 Deployment

### Opción 1: Vercel CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login en Vercel
vercel login

# 3. Deploy desde el directorio raíz
vercel

# 4. Configurar variables de entorno
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
# ... agregar todas las variables

# 5. Deploy a producción
vercel --prod
```

### Opción 2: GitHub Integration

```bash
# 1. Push código a GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Conectar repo en vercel.com
# 3. Configurar variables de entorno en dashboard
# 4. Deploy automático en cada push
```

## 📝 Variables de Entorno para Vercel

### Variables Requeridas

```bash
# Database
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_***
CLERK_SECRET_KEY=sk_live_***
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/registro

# Stripe
STRIPE_SECRET_KEY=sk_live_***
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_***
STRIPE_WEBHOOK_SECRET=whsec_***

# OpenAI
OPENAI_API_KEY=sk-***

# Redis (Upstash)
REDIS_URL=redis://default:password@host:port

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-super-secret-production-key
```

### Variables Opcionales

```bash
# Email
RESEND_API_KEY=re_***
RESEND_FROM_EMAIL=noreply@yourdomain.com

# File Upload
UPLOADTHING_SECRET=sk_***
UPLOADTHING_APP_ID=***

# Analytics
GOOGLE_ANALYTICS_ID=G-***

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 🗄️ Configuración de Base de Datos

### Ejecutar Migraciones

```bash
# Opción 1: Localmente (si tienes acceso a prod DB)
npx prisma migrate deploy

# Opción 2: En Vercel Functions (crear script)
# Ver: apps/web/src/app/api/migrate/route.ts
```

### Poblar Datos Iniciales

```bash
# Ejecutar seed (una sola vez)
npx prisma db seed
```

## 🔧 Configuración Específica de Vercel

### Build Settings

```json
{
  "buildCommand": "cd apps/web && npm run vercel-build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "npm install",
  "devCommand": "cd apps/web && npm run dev"
}
```

### Redirects y Rewrites

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "/dashboard",
      "permanent": false
    }
  ]
}
```

## 🔒 Seguridad en Producción

### Headers de Seguridad

```javascript
// next.config.js ya incluye headers de seguridad
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}
```

### Configuración CORS

```javascript
// Para APIs que necesiten CORS
const corsOptions = {
  origin: process.env.NEXT_PUBLIC_APP_URL,
  credentials: true
}
```

## 📊 Monitoreo

### Vercel Analytics

```bash
# 1. Habilitar en dashboard de Vercel
# 2. Añadir @vercel/analytics al proyecto
npm install @vercel/analytics

# 3. Configurar en layout.tsx
import { Analytics } from '@vercel/analytics/react'
```

### Error Tracking

```bash
# Opcional: Sentry integration
npm install @sentry/nextjs
```

## 🎛️ Post-Deployment

### 1. Verificar Funcionalidad

- [ ] Autenticación funciona
- [ ] Base de datos conectada
- [ ] Stripe webhooks configurados
- [ ] AI assistant responde
- [ ] Emails se envían

### 2. Configurar Dominio Personalizado

```bash
# En Vercel dashboard:
# 1. Settings > Domains
# 2. Añadir tu dominio
# 3. Configurar DNS records
```

### 3. SSL y Performance

- [ ] SSL automático habilitado
- [ ] Lighthouse score > 90
- [ ] First load time < 3s

## 🔄 CI/CD Automático

### GitHub Actions (Opcional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Errores Comunes

1. **Build failures**: Verificar variables de entorno
2. **Database connection**: Verificar URL y SSL
3. **Prisma issues**: Ejecutar `prisma generate`
4. **Memory limits**: Optimizar bundle size

### Logs y Debug

```bash
# Ver logs en tiempo real
vercel logs

# Ver logs específicos
vercel logs --app=your-app --since=1h
```

## 📞 Soporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Para bugs específicos del proyecto
- **Discord**: Canal de soporte del proyecto

---

**🎉 ¡Tu aplicación SaaS está lista para producción!**