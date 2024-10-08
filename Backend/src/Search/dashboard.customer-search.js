import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Router } from "express";
const router = Router();

router.post("/all", async (req, res) => {
  try {
    // receive data from the front end.

    const { custNumber, meterNumber } = req.body;

    if (!meterNumber && !custNumber) {
      throw new Error(
        "Please provide either a meter number or a customer number.",
      );
    }

    if (meterNumber && custNumber) {
      throw new Error(
        "Please provide only one of either a meter number or a customer number, not both.",
      );
    }
    // search in the tables.
    const getCustomer = await prisma.customers.findFirst({
      where: {
        OR: [
          meterNumber ? { meters: { meterNumber: meterNumber } } : {},
          custNumber ? { cust_id: String(custNumber) } : {},
        ],
      },
      include: {
        meters: true,
        meters: {
          include: {
            zones: true,
          },
        },
      },
    });

    if (getCustomer) {
      res.status(200).json({
        success: true,
        message: "Customer found successfully.",
        data: getCustomer,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/search/bills', async(req, res) => {
   try {
    // receive data from the front end.

    const { custNumber, meterNumber } = req.body;

    if (!meterNumber && !custNumber) {
      throw new Error(
        "Please provide either a meter number or a customer number.",
      );
    }

    if (meterNumber && custNumber) {
      throw new Error(
        "Please provide only one of either a meter number or a customer number, not both.",
      );
    }
    // search in the tables.
    const getCustomer = await prisma.billing.findFirst({
      where: {
        OR: [
          meterNumber ? { meters: { meterNumber: meterNumber } } : {},
          custNumber ? { cust_id: String(custNumber) } : {},
        ],
      },
      include: {
        meters: true,
        meters: {
          include: {
            zones: true,
          },
        },
        customer:true
      },
    });

    if (getCustomer) {
      res.status(200).json({
        success: true,
        message: "Customer found successfully.",
        data: getCustomer,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong.",  });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
})

export default router;
