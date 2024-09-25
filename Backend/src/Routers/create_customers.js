import { Router } from "express";
import {
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../Controllers/customers.js";
import verifyToken from "../Middleware/verifyToken.js";
const router = Router();

router.get("/all", verifyToken, getAllCustomers);

router.get("/:cust_id", verifyToken, getSingleCustomer);

router.post("/create", verifyToken, createCustomer);

router.patch("/update/:cust_id", verifyToken, updateCustomer);

router.delete("/delete/:cust_id", verifyToken, deleteCustomer);

export default router;
