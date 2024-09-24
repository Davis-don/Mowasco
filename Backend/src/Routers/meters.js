import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { getAllMeters, getSingleMeter, createNewMeter, updateMeter, deleteMeter } from "../Controllers/meters.js";
const router = Router()

router.get('/all',verifyToken, getAllMeters )

router.get('/:meter_id',verifyToken, getSingleMeter)

router.post('/create',verifyToken, createNewMeter)

router.patch('/:meter_id',verifyToken, updateMeter)

router.delete('/:meter_id',verifyToken, deleteMeter)

export default router;