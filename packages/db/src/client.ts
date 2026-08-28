import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import * as schema from "./schema"

const globalForDatabase = globalThis as unknown as {
  databasePool?: Pool
}

const connectionString = process.env.DATABASE_URL
const poolMax = Number(process.env.DATABASE_POOL_MAX ?? 10)

if (!connectionString) {
  throw new Error("DATABASE_URL is required")
}

if (!Number.isInteger(poolMax) || poolMax < 1) {
  throw new Error("DATABASE_POOL_MAX must be a positive integer")
}

const pool =
  globalForDatabase.databasePool ??
  new Pool({
    connectionString,
    max: poolMax,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    allowExitOnIdle: true,
  })

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.databasePool = pool
}

export const db = drizzle({ client: pool, schema })
export { pool }
