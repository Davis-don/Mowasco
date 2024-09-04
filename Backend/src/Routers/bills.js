import { Router } from "express";
import { getAllBills, getSingleBill, createBill, updateBill, deleteBill } from "../Controllers/bills.js";
const router = Router()

router.get('/all',getAllBills)
.get('/:bill_id',getSingleBill )
.post('/create',createBill )
.patch('/update/:bill_id', updateBill)
.delete('/delete/:bill_id',deleteBill )

export default router