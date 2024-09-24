import { getAllZones, getSingleZone, createZone, deleteZone } from "../Controllers/zones.js";
import verifyToken from "../Middleware/verifyToken.js";
import { Router } from "express";

const router = Router()

router.get('/all', verifyToken, getAllZones ).get('/:zone_id',verifyToken, getSingleZone ).post('/create', verifyToken, createZone).delete('/:zone_id', verifyToken,deleteZone)

export default router