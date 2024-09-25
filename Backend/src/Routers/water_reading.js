import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import {
  getAllReadings,
  getAllReadingsForOneMeter,
  getSigleReading,
  totalAmountConsumed,
  recordReading,
  deleteReading,
} from "../Controllers/water_reading.js";
const router = Router();

router.get("/all", verifyToken, getAllReadings);
router.get("/all/:meter_id/readings", verifyToken, getAllReadingsForOneMeter);

router.get("/all/total-readings", verifyToken, totalAmountConsumed);

router.get("/:meter_id", verifyToken, getSigleReading);

router.post("/create", verifyToken, recordReading);

router.delete("/:reading_id", verifyToken, deleteReading);

export default router;
