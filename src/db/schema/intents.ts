import { pgTable, text, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agentFrameworkEnum = pgEnum("agent_framework", ["Virtuals", "Eliza", "AgentKit", "Unknown"]);
export const intentStatusEnum = pgEnum("intent_status", ["confirmed", "pending", "failed"]);

export const intentsTable = pgTable("intents", {
  id: text("id").primaryKey(),
  proofHash: text("proof_hash").notNull(),
  agentFramework: agentFrameworkEnum("agent_framework").notNull().default("Unknown"),
  relayedAt: timestamp("relayed_at").notNull().defaultNow(),
  feeEth: numeric("fee_eth", { precision: 20, scale: 8 }).notNull(),
  status: intentStatusEnum("status").notNull().default("confirmed"),
  relayerRegion: text("relayer_region").notNull(),
});

export const insertIntentSchema = createInsertSchema(intentsTable).omit({});
export type InsertIntent = z.infer<typeof insertIntentSchema>;
export type Intent = typeof intentsTable.$inferSelect;
