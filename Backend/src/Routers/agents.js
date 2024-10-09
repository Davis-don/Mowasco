import { Router } from "express";
import {
  registerAgent,
  loginAgent,
  updateAgent,
  getAllAgents,
} from "../Controllers/agents.js";
import verifyToken from "../Middleware/verifyToken.js";
const router = Router();

router
  .post("/agent/login", loginAgent)
  .get("/agents/all", verifyToken, getAllAgents);

router
  .post("/agent/register", registerAgent)
  .patch("/agent/update-details/:agent_id", verifyToken, updateAgent);

export default router;
