import { Router } from "express";
import verifyToken from "../Middleware/verifyToken.js";
import { getAllReceipts, getSingleTransactionReceipt, getSingleReceipt, generateReceipt, deleteReceipt } from "../Controllers/receipts.js";
const router = Router()

router.get('/all',verifyToken, getAllReceipts)
router.get('/receipt/:bill_id',verifyToken, getSingleTransactionReceipt)
router.get('/:receipt_id',verifyToken, getSingleReceipt )

router.post('/generate',verifyToken, generateReceipt )

router.delete('/:receipt_id',verifyToken, deleteReceipt)


export default router;