import { Router } from "express";
import { getAllReadings, getSigleReading,totalAmountConsumed, recordReading, deleteReading } from "../Controllers/water_reading.js";
const router = Router()

router.get('/all', getAllReadings)

router.get('/all/total-readings', totalAmountConsumed)

router.get('/:reading_id', getSigleReading)

router.post('/create',recordReading)


router.delete('/:reading_id',deleteReading )

export default router