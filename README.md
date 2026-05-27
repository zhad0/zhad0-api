# ZHAD0 API

[![Status](https://img.shields.io/badge/status-live-00d26a.svg)](https://zhad0.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Express + Drizzle ORM backend for the ZHAD0 Protocol.
> Serves live network stats, Ghost Relayer data, intent activity,
> and protocol configuration for the [zhad0-app](https://github.com/zhad0/zhad0-app) frontend.

---

## Endpoints

All routes are prefixed `/api`.

| Method | Path | Description |
|---|---|---|
| GET | `/api/healthz` | Health check |
| GET | `/api/stats` | Live protocol statistics |
| GET | `/api/relayers` | List all Ghost Relayers |
| GET | `/api/relayers/:id` | Single relayer detail |
| GET | `/api/intents/feed` | Recent anonymized intent activity (last 50) |
| GET | `/api/intents/stats` | Intent aggregates by framework and status |
| GET | `/api/chain` | Base chain metadata |
| GET | `/api/token` | ZHAD0 token info and distribution |

Full OpenAPI 3.1 spec: [`openapi.yaml`](openapi.yaml)

---

## Stack

- **Express 5** — HTTP server
- **Drizzle ORM** — type-safe PostgreSQL queries
- **PostgreSQL** — persistence layer
- **Pino** — structured JSON logging
- **Zod** — runtime schema validation
- **esbuild** — single-file ESM bundle

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/zhad0/zhad0-api.git
cd zhad0-api

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# Edit .env with your DATABASE_URL

# 4. Build
npm run build

# 5. Start
npm start
```

Server runs on `PORT` (default: `3001`).

---

## Database

The server uses PostgreSQL via Drizzle ORM. Schema is defined in `src/db/schema/`.

**Tables:**

| Table | Description |
|---|---|
| `intents` | Anonymized intent activity records |
| `relayers` | Ghost Relayer operator registry |

To push schema to a fresh database:

```bash
# Using drizzle-kit (install separately)
npx drizzle-kit push --config drizzle.config.ts
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PORT` | No | Server port (default: 3001) |
| `LOG_LEVEL` | No | Pino log level (default: info) |
| `NODE_ENV` | No | `development` enables pretty logging |

---

## Project Structure

```
src/
  db/
    index.ts          Drizzle client + pool
    schema/
      intents.ts      Intents table + Zod schema
      relayers.ts     Relayers table + Zod schema
  api-zod/
    generated/        Zod schemas from OpenAPI spec
  lib/
    logger.ts         Pino singleton
  routes/
    health.ts
    stats.ts
    relayers.ts
    intents.ts
    chain.ts
    token.ts
    index.ts          Router aggregator
  app.ts              Express app setup
  index.ts            Server entry point
build.mjs             esbuild bundler config
openapi.yaml          OpenAPI 3.1 spec
```

---

## Related Repos

| Repo | Description |
|---|---|
| [`zhad0/zhad0-app`](https://github.com/zhad0/zhad0-app) | React frontend |
| [`zhad0/zhad0-sdk`](https://github.com/zhad0/zhad0-sdk) | TypeScript SDK + CLI |
| [`zhad0/zhad0-docs`](https://github.com/zhad0/zhad0-docs) | Protocol documentation |

---

## License

MIT — see [LICENSE](LICENSE)

Website: [zhad0.io](https://zhad0.io)
