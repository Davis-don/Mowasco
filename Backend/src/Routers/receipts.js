import { Router } from "express";
import { getAllReceipts, getSingleReceipt, generateReceipt, deleteReceipt } from "../Controllers/receipts.js";
const router = Router()

router.get('/all', getAllReceipts)

router.get('/:receipt_id',getSingleReceipt )

router.post('/generate',generateReceipt )

router.delete('/:receipt_id',deleteReceipt)


export default router;