import { Router } from "express";
import { db } from "../db";
import { relayersTable } from "../db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/relayers", async (req, res) => {
  try {
    const relayers = await db.select().from(relayersTable).orderBy(relayersTable.registeredAt);
    res.json(
      relayers.map((r) => ({
        id: r.id,
        operatorAddress: r.operatorAddress,
        stakedZhad0: r.stakedZhad0,
        status: r.status,
        uptimePct: Number(r.uptimePct),
        intentsRelayed: r.intentsRelayed,
        earningsEth: r.earningsEth,
        region: r.region,
        registeredAt: r.registeredAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list relayers");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/relayers/:id", async (req, res) => {
  try {
    const [relayer] = await db
      .select()
      .from(relayersTable)
      .where(eq(relayersTable.id, req.params.id));

    if (!relayer) {
      res.status(404).json({ error: "Relayer not found" });
      return;
    }

    res.json({
      id: relayer.id,
      operatorAddress: relayer.operatorAddress,
      stakedZhad0: relayer.stakedZhad0,
      status: relayer.status,
      uptimePct: Number(relayer.uptimePct),
      intentsRelayed: relayer.intentsRelayed,
      earningsEth: relayer.earningsEth,
      region: relayer.region,
      registeredAt: relayer.registeredAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get relayer");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
