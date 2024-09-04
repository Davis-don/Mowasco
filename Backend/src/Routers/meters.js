import { Router } from "express";
import { getAllMeters, getSingleMeter, createNewMeter, updateMeter, deleteMeter } from "../Controllers/meters.js";
const router = Router()

router.get('/all',getAllMeters )

router.get('/:meter_id',getSingleMeter)

router.post('/create',createNewMeter)

router.patch('/:meter_id',updateMeter)

router.delete('/:meter_id',deleteMeter)

export default router;