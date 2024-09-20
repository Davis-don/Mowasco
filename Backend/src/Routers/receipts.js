import { Router } from "express";
import { getAllReceipts, getSingleTransactionReceipt, getSingleReceipt, generateReceipt, deleteReceipt } from "../Controllers/receipts.js";
const router = Router()

router.get('/all', getAllReceipts)
router.get('/receipt/:bill_id', getSingleTransactionReceipt)
router.get('/:receipt_id',getSingleReceipt )

router.post('/generate',generateReceipt )

router.delete('/:receipt_id',deleteReceipt)


export default router;