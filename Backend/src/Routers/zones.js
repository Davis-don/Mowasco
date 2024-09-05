import { getAllZones, getSingleZone, createZone, deleteZone } from "../Controllers/zones.js";
import { Router } from "express";

const router = Router()

router.get('/all',getAllZones ).get('/:zone_id',getSingleZone ).post('/create', createZone).delete('/:zone_id', deleteZone)

export default router