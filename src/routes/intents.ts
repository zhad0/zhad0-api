import { Router } from "express";
import { db } from "../db";
import { intentsTable } from "../db";
import { desc, eq, sql, sum, count } from "drizzle-orm";

const router = Router();

router.get("/intents/feed", async (req, res) => {
  try {
    const intents = await db
      .select()
      .from(intentsTable)
      .orderBy(desc(intentsTable.relayedAt))
      .limit(50);

    res.json(
      intents.map((i) => ({
        id: i.id,
        proofHash: i.proofHash,
        agentFramework: i.agentFramework,
        relayedAt: i.relayedAt.toISOString(),
        feeEth: i.feeEth,
        status: i.status,
        relayerRegion: i.relayerRegion,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get intent feed");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/intents/stats", async (req, res) => {
  try {
    const byFramework = await db
      .select({
        framework: intentsTable.agentFramework,
        count: count(),
      })
      .from(intentsTable)
      .groupBy(intentsTable.agentFramework);

    const byStatus = await db
      .select({
        status: intentsTable.status,
        count: count(),
      })
      .from(intentsTable)
      .groupBy(intentsTable.status);

    const [last24h] = await db
      .select({
        intentCount: count(),
        totalFees: sum(intentsTable.feeEth),
      })
      .from(intentsTable)
      .where(sql`${intentsTable.relayedAt} > NOW() - INTERVAL '24 hours'`);

    const totalIntents = byFramework.reduce((acc, r) => acc + Number(r.count), 0);
    const totalByStatus = byStatus.reduce((acc, r) => acc + Number(r.count), 0);

    res.json({
      byFramework: byFramework.map((r) => ({
        framework: r.framework,
        count: Number(r.count),
        pct: totalIntents > 0 ? Math.round((Number(r.count) / totalIntents) * 100 * 10) / 10 : 0,
      })),
      byStatus: byStatus.map((r) => ({
        status: r.status,
        count: Number(r.count),
        pct: totalByStatus > 0 ? Math.round((Number(r.count) / totalByStatus) * 100 * 10) / 10 : 0,
      })),
      last24hIntents: Number(last24h?.intentCount ?? 0),
      last24hFeesEth: Number(last24h?.totalFees ?? 0).toFixed(6),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get intent stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
