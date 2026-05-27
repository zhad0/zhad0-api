import { Router } from "express";

const router = Router();

router.get("/chain", (_req, res) => {
  res.json({
    name: "Base",
    chainId: 8453,
    rpcUrl: "https://mainnet.base.org",
    explorerUrl: "https://basescan.org",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    isL2: true,
    settlementChain: "Ethereum Mainnet",
    blockTime: 2,
    contractAddress: "0xZHAD0000000000000000000000000000000000001",
  });
});

export default router;
