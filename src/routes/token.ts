import { Router } from "express";

const router = Router();

router.get("/token", (_req, res) => {
  res.json({
    symbol: "ZHAD0",
    name: "ZHAD0 Protocol Token",
    totalSupply: "1000000000",
    circulatingSupply: "0",
    holders: 0,
    contractAddress: null,
    distribution: [
      { label: "Relayer Rewards", pct: 35, amount: "350000000", color: "#e83c87" },
      { label: "Ecosystem & Dev", pct: 25, amount: "250000000", color: "#a855f7" },
      { label: "Community Sale",  pct: 20, amount: "200000000", color: "#6366f1" },
      { label: "Team & Advisors", pct: 12, amount: "120000000", color: "#475569" },
      { label: "Treasury",        pct: 8,  amount: "80000000",  color: "#1e293b" },
    ],
    vestingSchedule: [
      { group: "Relayer Rewards", cliff: "None",      vesting: "4 years linear",    tge: "5%" },
      { group: "Ecosystem & Dev", cliff: "6 months",  vesting: "3 years linear",    tge: "0%" },
      { group: "Community Sale",  cliff: "None",       vesting: "1 year linear",     tge: "20%" },
      { group: "Team & Advisors", cliff: "12 months", vesting: "3 years linear",    tge: "0%" },
      { group: "Treasury",        cliff: "None",       vesting: "DAO-controlled",    tge: "0%" },
    ],
    phaseStatus: [
      { phase: 1, label: "Protocol Design",     status: "completed", description: "Architecture, cryptographic constructions, and whitepaper published." },
      { phase: 2, label: "Testnet Alpha",        status: "active",    description: "Ghost Relay node software in development. Base Sepolia deployment in progress." },
      { phase: 3, label: "Mainnet Launch",       status: "upcoming",  description: "Base mainnet deployment. $ZHAD0 genesis distribution. First Ghost Relayers onboarded." },
      { phase: 4, label: "Relayer CLI & DAO",    status: "upcoming",  description: "On-chain staking contracts, RelayRegistry, governance DAO launch." },
      { phase: 5, label: "SDK Integrations",     status: "upcoming",  description: "Virtuals, Eliza, AgentKit drop-in SDK packages. Developer ecosystem grants." },
    ],
  });
});

export default router;
