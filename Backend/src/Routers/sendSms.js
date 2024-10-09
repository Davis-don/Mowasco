import { Router } from "express";
import { sendSMS } from "../Controllers/send.sms.js";
import verifyToken from "../Middleware/verifyToken.js";
const router = Router();

router.post("/message", sendSMS);

export default router;
