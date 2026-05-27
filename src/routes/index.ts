import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import relayersRouter from "./relayers";
import intentsRouter from "./intents";
import chainRouter from "./chain";
import tokenRouter from "./token";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(relayersRouter);
router.use(intentsRouter);
router.use(chainRouter);
router.use(tokenRouter);

export default router;
