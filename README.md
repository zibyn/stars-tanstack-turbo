# Stars TanStack Turbo

A production-oriented monorepo template built directly from TanStack Start and the shadcn
monorepo scaffold.

## Stack

- Turborepo, pnpm 11, TypeScript 6, and Biome
- TanStack Start with Nitro and React Compiler
- React 19, Tailwind CSS 4, and shadcn/ui with Base UI primitives
- TanStack Query, Form, and Table
- Better Auth with email/password authentication
- Drizzle ORM and PostgreSQL

## Structure

```text
apps/web       TanStack Start application and Better Auth server
docker         Local development infrastructure
packages/db    Drizzle client, schemas, and migrations
packages/ui    Shared shadcn/ui components and styles
```

## Getting started

Requirements: Node.js 22.12 or newer, pnpm 11, and Docker for the included PostgreSQL service.

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm auth:secret
```

Put the generated secret in `BETTER_AUTH_SECRET` inside `apps/web/.env.local`, then start
PostgreSQL, apply the schema, and run the application:

```bash
pnpm db:up
pnpm db:push
pnpm dev
```

The web application runs at <http://localhost:3000>. The Better Auth handler is mounted at
`/api/auth/*`.

If port `5432` is already in use, set `POSTGRES_PORT` in `apps/web/.env.local` and update the
port in `DATABASE_URL` to the same value.

Environment files belong to the deployable application under `apps/web`. Vite/TanStack Start
loads them, while `@t3-oss/env-core` validates server and client variables. Production should
provide the same variables through the deployment platform rather than committed files.

## Better Auth

The server configuration is in `apps/web/src/lib/auth.ts`. It includes the PostgreSQL Drizzle
adapter, email/password authentication, relation joins, and the TanStack Start cookie plugin.
Keep `tanstackStartCookies()` last when adding plugins.

Client code should import `authClient` from `@/lib/auth-client`. Server functions and protected
routes can use `getSession` or `ensureSession` from `@/lib/auth.functions`.

After changing Better Auth plugins or models, regenerate its Drizzle schema and create a
migration:

```bash
pnpm auth:generate
pnpm db:generate
pnpm db:migrate
```

`auth:generate` writes `packages/db/src/schema/auth.ts`. Commit that schema and generated
migrations. Use `db:push` for local prototyping; use generated migrations for deployed
environments.

## Database commands

```bash
pnpm db:up        # Start PostgreSQL
pnpm db:down      # Stop PostgreSQL
pnpm db:logs      # Follow PostgreSQL logs
pnpm db:generate  # Generate SQL migrations from schema changes
pnpm db:migrate   # Apply generated migrations
pnpm db:push      # Push schema directly to a development database
pnpm db:pull      # Introspect an existing database
pnpm db:studio    # Open Drizzle Studio
```

## UI components

Both shadcn configurations use the `base-nova` preset, backed by Base UI rather than Radix.
Add shared components from the repository root:

```bash
pnpm dlx shadcn@latest add input field dialog -c apps/web
```

The CLI places shared UI components in `packages/ui/src/components`.

## Quality checks

```bash
pnpm generate
pnpm check
pnpm build
```

Use `pnpm check:fix` to apply Biome formatting and safe lint fixes.

## Use as a GitHub template

Push this repository to GitHub, open its repository settings, and enable **Template repository**.
New projects can then be created with **Use this template**, or with the GitHub CLI:

```bash
gh repo create my-project --template your-account/stars-tanstack-turbo --private --clone
```
