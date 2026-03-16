# AI Integration Hub

Plataforma B2B para conectar sistemas y automatizar workflows con agentes, approvals y auditoría.

## Descripción

**AI Integration Hub** es un proyecto de portafolio orientado a demostrar una arquitectura moderna para automatización de procesos empresariales con IA. El sistema centraliza organizaciones, integraciones, workflows, ejecuciones, aprobaciones y registros de auditoría en una interfaz tipo SaaS, con backend modular y base técnica preparada para orquestación con agentes.

El proyecto está diseñado para evidenciar capacidades en:

- arquitectura full stack
- diseño modular de backend
- autenticación y protección de rutas
- persistencia con Prisma y PostgreSQL
- trazabilidad con audit logs
- human-in-the-loop con approvals
- integración de IA y orquestación de workflows

---

## Documentación

Documentación disponible aquí:

[View Documentation](https://github.com/josemobarec/ai-integration-hub/blob/main/docs/AI_Integration_Hub.pdf)



---

## Stack principal

### Frontend
- Next.js
- TypeScript
- Clerk
- CSS custom

### Backend
- NestJS
- Prisma
- PostgreSQL
- Redis
- Docker Compose

### IA y orquestación
- OpenAI Responses API
- LangGraph
- Zod

---

## Funcionalidades implementadas

- autenticación con Clerk
- dashboard privado con navegación lateral
- gestión base de organizaciones
- listado de integraciones
- listado y creación de workflows
- listado y creación de runs
- trigger de workflows tipo email triage
- approvals con approve/reject
- audit logs consultables
- persistencia estructurada de resultados del flujo

---

## Arquitectura general

El sistema está dividido en dos aplicaciones principales:

- `apps/web`: frontend con Next.js
- `apps/api`: backend con NestJS

El backend sigue una estructura modular por dominio:

- `organizations`
- `integrations`
- `workflows`
- `runs`
- `approvals`
- `audit`
- `triage`

La persistencia se gestiona con Prisma sobre PostgreSQL, mientras que Redis queda preparado como soporte para colas y procesamiento futuro.

---

## Flujo principal del sistema

1. Un usuario autenticado accede al dashboard.
2. El sistema muestra organizaciones, integraciones, workflows, runs y approvals desde el backend real.
3. Un workflow puede dispararse mediante el endpoint de trigger.
4. El sistema genera un run, clasifica el caso y persiste el resultado.
5. Si corresponde, se crea una aprobación para intervención humana.
6. Todas las acciones relevantes quedan registradas en audit logs.

---

## Capturas del proyecto

### Landing pública
![Landing]([https://github.com/josemobarec/ai-integration-hub/blob/main/images/landing.png)

### Dashboard
![Dashboard](https://github.com/josemobarec/ai-integration-hub/blob/main/images/dashboard.png)

### Organizations
![Organizations](https://github.com/josemobarec/ai-integration-hub/blob/main/images/organizations.png)

### Integrations
![Integrations](https://github.com/josemobarec/ai-integration-hub/blob/main/images/integrations.png)

### Workflows
![Workflows](https://github.com/josemobarec/ai-integration-hub/blob/main/images/workflows.png)

### Runs
![Runs](https://github.com/josemobarec/ai-integration-hub/blob/main/images/runs.png)

### Approvals
![Approvals](https://github.com/josemobarec/ai-integration-hub/blob/main/images/approvals.png)


---

## Estructura del proyecto

```bash
ai-integration-hub/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   ├── src/
│   │   │   ├── organizations/
│   │   │   ├── integrations/
│   │   │   ├── workflows/
│   │   │   ├── runs/
│   │   │   ├── approvals/
│   │   │   ├── audit/
│   │   │   └── triage/
│   └── web/
│       ├── app/
│       ├── public/
│       └── lib/
├── images/
├── docker-compose.yml
└── README.md
```

---

## Variables de entorno

Backend `(apps/api/.env)`
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/aihub
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

Frontend `(apps/web/.env.local)`
```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## Ejecución local

1. Levantar infraestructura

Desde la raíz:


```bash
docker compose up -d
```

2. Levantar backend

```bash
cd apps/api
npm install
npm run start:dev
```
Backend disponible en:

`http://localhost:3000`

3. Levantar frontend
```
cd apps/web
npm install
npm run dev
```
Frontend disponible en:

`http://localhost:3001`

---

## Endpoints principales

Organizations

  - `GET /organizations`
  
  - `POST /organizations`

Integrations

  - `GET /integrations`

Workflows

  - `GET /workflows`
  
  - `POST /workflows`
  
  - `POST /workflows/:id/trigger`

Runs

  - `GET /runs`
  
  - `POST /runs`

Approvals

  - `GET /approvals`
  
  - `PATCH /approvals/:id/approve`
  
  - `PATCH /approvals/:id/reject`

Audit

  - `GET /audit`
  
  - `GET /audit?workflowRunId=:id`



## Valor de portafolio

Este proyecto fue construido con foco en portafolio profesional y busca demostrar:

  - diseño de sistemas orientados a workflows
  
  - separación clara entre frontend y backend
  
  - integración de autenticación real
  
  - persistencia, trazabilidad y auditoría
  
  - modelado de procesos con approvals
  
  - preparación para IA aplicada a procesos empresariales

No se trata solo de una interfaz visual, sino de una base técnica de producto SaaS B2B con componentes reales de dominio.

## Estado actual

El proyecto cuenta con:

  - base full stack funcional
  
  - backend modular operativo
  
  - frontend protegido con auth
  
  - navegación entre módulos
  
  - conexión real entre UI y API
  
  - workflows, runs y approvals persistidos
  
  - auditoría de eventos
  
  - base preparada para orquestación con IA

Autor

Desarrollado  por José Mobares.

GitHub: [josemobarec](https://github.com/josemobarec)











