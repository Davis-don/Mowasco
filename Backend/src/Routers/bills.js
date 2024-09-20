import { Router } from "express";
import { getAllBills, getSingleBill, getCustomersBills, createBill, updateBill, deleteBill } from "../Controllers/bills.js";
const router = Router()

router.get('/all',getAllBills)
.get('/customer/all/:cust_id',getCustomersBills )
.get('/:bill_id',getSingleBill )
.post('/create',createBill )
.patch('/update/:bill_id', updateBill)
.delete('/delete/:bill_id',deleteBill )

export default router