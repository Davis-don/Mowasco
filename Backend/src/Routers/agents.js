import { Router } from "express";
import { registerAgent, loginAgent , updateAgent } from "../Controllers/agents.js";
import verifyToken from '../Middleware/verifyToken.js'
const router = Router();

router.post("/agent/login", loginAgent);

router.post("/agent/register", registerAgent).patch('/agent/update-details/:agent_is',verifyToken,updateAgent )

export default router;
