import { Router } from "express";
import { getAllCustomers, getSingleCustomer, createCustomer, updateCustomer, deleteCustomer } from "../Controllers/customers.js";
import verifyToken from "../Middleware/verifyToken.js";
const router = Router()

router.get('/all',verifyToken, getAllCustomers )

router.get('/:cust_id', getSingleCustomer)

router.post('/create', createCustomer)

router.patch('/update/:cust_id',updateCustomer)

router.delete('/delete/:cust_id', deleteCustomer)



export default router