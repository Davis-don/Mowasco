import { Router } from "express";
import { getAllBills, getSingleBill, getCustomersBills, createBill, updateBill, deleteBill } from "../Controllers/bills.js";
import verifyToken from "../Middleware/verifyToken.js";
const router = Router()

router.get('/all',verifyToken,getAllBills)
.get('/customer/all/:cust_id',verifyToken,getCustomersBills )
.get('/:bill_id',verifyToken,getSingleBill )
.post('/create',verifyToken,createBill )
.patch('/update/:bill_id',verifyToken, updateBill)
.delete('/delete/:bill_id',verifyToken,deleteBill )

export default router