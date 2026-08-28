import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const exampleItems = pgTable("example_items", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
