import { Router } from "express";
import { db } from "../db";
import { relayersTable, intentsTable } from "../db";
import { count, sum, avg, eq } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [relayerStats] = await db
      .select({
        total: count(),
        activeCount: count(relayersTable.status),
        totalStaked: sum(relayersTable.stakedZhad0),
      })
      .from(relayersTable);

    const [activeCount] = await db
      .select({ count: count() })
      .from(relayersTable)
      .where(eq(relayersTable.status, "active"));

    const [intentStats] = await db
      .select({
        total: count(),
        totalFees: sum(intentsTable.feeEth),
      })
      .from(intentsTable);

    const [avgRelay] = await db
      .select({ avgTime: avg(relayersTable.uptimePct) })
      .from(relayersTable);

    res.json({
      totalRelayers: Number(relayerStats?.total ?? 0),
      activeRelayers: Number(activeCount?.count ?? 0),
      totalIntentsProcessed: Number(intentStats?.total ?? 0),
      totalFeesEth: (Number(intentStats?.totalFees ?? 0)).toFixed(6),
      totalStakedZhad0: (Number(relayerStats?.totalStaked ?? 0)).toFixed(0),
      zkProofsGenerated: Number(intentStats?.total ?? 0),
      avgRelayTimeMs: null,
      uptimePct: Number(Number(avgRelay?.avgTime ?? 0).toFixed(2)),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get protocol stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
