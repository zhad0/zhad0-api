import { pgTable, text, numeric, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const relayerStatusEnum = pgEnum("relayer_status", ["active", "inactive", "slashed"]);

export const relayersTable = pgTable("relayers", {
  id: text("id").primaryKey(),
  operatorAddress: text("operator_address").notNull(),
  stakedZhad0: numeric("staked_zhad0", { precision: 20, scale: 4 }).notNull(),
  status: relayerStatusEnum("status").notNull().default("active"),
  uptimePct: numeric("uptime_pct", { precision: 5, scale: 2 }).notNull().default("0"),
  intentsRelayed: integer("intents_relayed").notNull().default(0),
  earningsEth: numeric("earnings_eth", { precision: 20, scale: 8 }).notNull().default("0"),
  region: text("region").notNull(),
  registeredAt: timestamp("registered_at").notNull().defaultNow(),
});

export const insertRelayerSchema = createInsertSchema(relayersTable).omit({});
export type InsertRelayer = z.infer<typeof insertRelayerSchema>;
export type Relayer = typeof relayersTable.$inferSelect;
