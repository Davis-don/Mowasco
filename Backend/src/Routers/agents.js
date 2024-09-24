import { Router } from "express";
import { registerAgent, loginAgent } from "../Controllers/agents.js";
const router = Router()

router.post('/agent/login',loginAgent )

router.post('/agent/register',registerAgent )


export default router