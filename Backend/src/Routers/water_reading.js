import { Router } from "express";
import { getAllReadings, getSigleReading, recordReading, deleteReading } from "../Controllers/water_reading.js";
const router = Router()

router.get('/all', getAllReadings)

router.get('/:reading_id', getSigleReading)

router.post('/create',recordReading)


router.delete('/:reading_id',deleteReading )

export default router