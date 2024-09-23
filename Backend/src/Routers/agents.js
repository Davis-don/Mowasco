import { Router } from "express";
import { registerAgent, loginAgent } from "../Controllers/agents.js";
const router = Router()

router.post('/agent/register',registerAgent )

router.post('/agent/login',loginAgent )

export default router