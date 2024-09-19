import { Router } from "express";
import { getAllReadings,getAllReadingsForOneMeter, getSigleReading,totalAmountConsumed, recordReading, deleteReading } from "../Controllers/water_reading.js";
const router = Router()

router.get('/all', getAllReadings)
router.get('/all/:meter_id/readings', getAllReadingsForOneMeter)

router.get('/all/total-readings', totalAmountConsumed)

router.get('/:meter_id', getSigleReading)

router.post('/create',recordReading)


router.delete('/:reading_id',deleteReading )

export default router