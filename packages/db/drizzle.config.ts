import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

const packageRoot = fileURLToPath(new URL(".", import.meta.url))
const webRoot = resolve(packageRoot, "../../apps/web")

config({
  path: [resolve(webRoot, ".env.local"), resolve(webRoot, ".env")],
})

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/app",
  },
})
