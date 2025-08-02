# 🚀 SaaS Multivendor Platform

> Plataforma SaaS multivendedor completa con asistente AI, análisis avanzado y herramientas de gestión integral.

## ✨ Características Principales

### 🎯 **Panel del Vendedor Integral**
- **Dashboard con KPIs en tiempo real**: Ventas, márgenes, pedidos, AOV, ROAS
- **Gráficas de tendencia**: Últimos 30/90 días con heatmap de horas pico
- **Acciones sugeridas por IA**: Reabastecimiento, promociones, optimizaciones

### 📦 **Gestión de Catálogo**
- **CRUD completo** de productos, variantes y colecciones jerárquicas
- **Generador de variantes masivo** con plantillas (tallas, colores)
- **Importador/Exportador CSV avanzado**:
  - Mapeo de columnas drag-and-drop
  - Validación en tiempo real
  - Soporte hasta 50,000 filas
  - Historial de importaciones
  - Programación recurrente (cron)
- **Bulk actions**: Cambios masivos de precios, categorías, estado
- **Multi-almacén**: Stock por ubicación y transferencias

### 📋 **Pedidos & Logística**
- **Flujo Kanban configurable**: Estados personalizables
- **Vista tabla + Kanban** con filtros avanzados
- **Generación de etiquetas** de envío (Shippo/EasyPost)
- **Devoluciones/RMA**: Flujo completo con aprobaciones
- **Pick & Pack**: Listas imprimibles y códigos de barras

### 💰 **Pagos & Finanzas**
- **Stripe Connect**: Split-payments y payouts automáticos
- **Balance en tiempo real** con historial detallado
- **Facturas PDF** con branding personalizado
- **Integración contable**: QuickBooks, Xero

### 📊 **Analytics & BI**
- **Métricas de cohortes**: LTV, churn rate, funnel de conversión
- **Predicción de demanda**: Modelos ARIMA/Prophet
- **Exportación**: CSV, Google Sheets, API REST/GraphQL

### 🎯 **Marketing & Crecimiento**
- **Constructor de cupones** (%, fijo, BOGO, envío gratis)
- **Email automation** con editor drag-and-drop (Resend)
- **Feed productos**: Google Shopping, Meta Catalog
- **Generador de copy** y SEO con GPT-4o

### 🤖 **Chat con Asistente AI**
- **Globo flotante** visible en todas las páginas
- **Interface tipo Slack** con threads y slash-commands
- **Funciones registradas**:
  - `/resumen-ventas [periodo]`
  - `/predecir-stock [SKU]`
  - `/crear-cupon [params]`
  - `/redactar-descripcion [producto]`
- **Adjuntar archivos** para análisis por IA
- **Modo memoria** para recordar preferencias

### 👥 **CRM & Clientes**
- **Ficha única**: Datos, pedidos, valor total, segmentación
- **Automatizaciones**: Carrito abandonado, cumpleaños, up-sell

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + Shadcn/ui + Framer Motion
- **React Query** + Zustand + React Hook Form

### Backend
- **NestJS** + Fastify + Prisma (PostgreSQL 15)
- **Redis** (BullMQ) + **pgvector** (AI embeddings)
- **Arquitectura multi-tenant** por `vendor_id`

### Autenticación & Pagos
- **Clerk.dev** (OAuth Google + email)
- **Stripe Connect** (split-payments)

### AI & Integraciones
- **OpenAI GPT-4o** con function calling
- **Shopify Admin/Storefront API** (opcional)
- **Resend** (email), **Uploadthing** (archivos)

### DevOps
- **Docker Compose** + **Turborepo**
- **GitHub Actions** (CI/CD)
- **Playwright** + **Jest** (testing)

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 18.17.0+
- Docker & Docker Compose
- Git

### 1. Clonar y configurar

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/saas-multivendor-platform.git
cd saas-multivendor-platform

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus claves API
```

### 2. Levantar servicios

```bash
# Iniciar PostgreSQL y Redis
docker-compose up -d

# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Sembrar datos de prueba
npm run db:seed
```

### 3. Iniciar desarrollo

```bash
# Modo desarrollo (todas las apps)
npm run dev

# Solo frontend
cd apps/web && npm run dev

# Solo backend API
cd apps/api && npm run dev
```

### 4. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **pgAdmin**: http://localhost:5050 (admin@admin.com / admin)

## 📝 Variables de Entorno Requeridas

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saas_platform"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_***
CLERK_SECRET_KEY=sk_test_***

# Stripe
STRIPE_SECRET_KEY=sk_test_***
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_***

# OpenAI
OPENAI_API_KEY=sk-***

# Redis
REDIS_URL=redis://localhost:6379
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Coverage
npm run test:coverage

# Lighthouse CI
npm run lighthouse
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia todos los servicios
npm run build           # Build de producción
npm run start           # Inicia en modo producción

# Base de datos
npm run db:generate     # Genera cliente Prisma
npm run db:push         # Push cambios a DB
npm run db:migrate      # Ejecuta migraciones
npm run db:seed         # Siembra datos de prueba
npm run db:studio       # Abre Prisma Studio

# Testing
npm run test            # Tests unitarios
npm run test:e2e        # Tests end-to-end
npm run lint            # Linting
npm run type-check      # Verificación TypeScript

# Docker
npm run docker:dev      # Docker para desarrollo
npm run docker:prod     # Docker para producción
```

## 📁 Estructura del Proyecto

```
.
├── apps/
│   ├── web/                    # Frontend Next.js 14
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   ├── components/    # Componentes React
│   │   │   ├── lib/          # Utilidades y providers
│   │   │   └── hooks/        # Custom hooks
│   │   └── public/           # Assets estáticos
│   └── api/                   # Backend NestJS
│       ├── src/
│       │   ├── modules/      # Módulos de negocio
│       │   ├── common/       # Pipes, guards, decorators
│       │   └── database/     # Configuración DB
│       └── test/             # Tests API
├── packages/
│   ├── ui/                   # Componentes UI compartidos
│   ├── database/            # Schema Prisma y migraciones
│   ├── shared/              # Types y utils compartidos
│   └── ai-assistant/        # Lógica del asistente AI
├── docker-compose.yml       # Servicios Docker
└── turbo.json              # Configuración Turborepo
```

## 🔧 Configuración de Desarrollo

### Base de Datos
- PostgreSQL 15 con extensión pgvector
- Prisma ORM con esquema multi-tenant
- Migraciones automáticas en desarrollo

### Autenticación
- Clerk.dev para OAuth y gestión de usuarios
- Roles: admin, vendor, staff
- Permisos granulares por módulo

### Pagos
- Stripe Connect para marketplace
- Split-payments automáticos
- Webhooks para eventos de pago

### AI Assistant
- OpenAI GPT-4o con function calling
- Embeddings con pgvector
- Context window optimizado

## 📈 Flujo de Importación CSV

1. **Acceso**: Botón "Importar CSV" en módulo Catálogo
2. **Plantillas**: Descarga plantilla con columnas mínimas
3. **Subida**: Dropzone con validación (≤20MB, csv|xlsx)
4. **Mapeo**: UI drag-and-drop para columnas→propiedades
5. **Validación**: Errores en línea, recomendaciones IA
6. **Procesamiento**: Cola BullMQ con progreso en tiempo real
7. **Resumen**: Registros creados/actualizados, errores descargables
8. **Programación**: Importaciones recurrentes automáticas

## 🔌 API Externa

### REST Endpoints
```
GET    /api/v1/products       # Listar productos
POST   /api/v1/products       # Crear producto
PUT    /api/v1/products/:id   # Actualizar producto
DELETE /api/v1/products/:id   # Eliminar producto
```

### GraphQL
```graphql
query GetProducts($filter: ProductFilter) {
  products(filter: $filter) {
    id
    title
    price
    variants {
      id
      sku
      inventory {
        quantity
      }
    }
  }
}
```

### Webhooks
- `product.created`
- `product.updated`
- `order.created`
- `payment.completed`

## 🚀 Deployment

### Fly.io (Recomendado)
```bash
# Instalar CLI
curl -L https://fly.io/install.sh | sh

# Hacer deploy
fly deploy
```

### Railway
```bash
# Conectar repositorio
railway login
railway init
railway up
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- 📖 **Documentación**: [docs.saasplatform.com](https://docs.saasplatform.com)
- 💬 **Discord**: [discord.gg/saasplatform](https://discord.gg/saasplatform)  
- 📧 **Email**: support@saasplatform.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/tu-usuario/saas-multivendor-platform/issues)

---

**¡Construido con ❤️ para empoderar vendedores digitales!**