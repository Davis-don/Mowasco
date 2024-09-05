import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllReceipts = async(req, res) => {
   try {
     const getReceipts = await prisma.receipts.findMany({
        select: {
            receipt_id: true,
            receiptNumber: true,
            amount_paid: true,
            deadline_date: true,
            customer: true,
            meters: true,
            billing:true

        }
     })

     if (getReceipts != null){
        res.status(200).json({success:true, message: 'All receipts found successfully.', data: getReceipts})
     } else{
        res.status(500).json({success:true, message: 'Something went wrong. Server error'})
     }
   } catch (error) {
    res.status(500).json({success: false, message: error.message})
   }
}

export const getSingleReceipt = async(req, res) => {
   try {
    const {receipt_id} = req.params;

    const getReceipt = await prisma.receipts.findUnique({
        where: {receipt_id:receipt_id}
    })

     if (getReceipt != null){
        res.status(200).json({success:true, message: 'Receipt found successfully.', data: getReceipt})
     } else{
        res.status(500).json({success:false, message: 'Something went wrong. Server error'})
     }
   } catch (error) {
    res.status(500).json({success:false, message:error.message})
   }
}

export const generateReceipt = async(req, res) => {
    try {
        const {receiptNumber, amount_paid, deadline_date, bill_id,meter_id, cust_id} = req.body;

        let custId = '5da90084-ab2a-4b74-af15-537fd6d910e3'
        let meterID = 'c46ab4e5-92fd-4b60-9a47-4c5b1a8369d1'
        let billID = 'a8d665e2-2464-4c7e-97f7-f2b2627f9201'

        const generate = await prisma.receipts.create({
            data:{
                receiptNumber,
                amount_paid, 
                deadline_date,
                billing:{
                    connect:{
                        bill_id:billID
                    }
                },
                meters: {
                    connect:{
                        meter_id: meterID
                    }
                },
                customer: {
                    connect:{
                        cust_id:custId
                    }
                }
            }
        })

        if (generate != null){
            res.status(200).json({success: true, message:"Receipt generated successfully."})
        } else{
            res.status(500).json({success: false, message:"Server error."})

        }
        
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

export const deleteReceipt =  async(req, res) => {
    try {
    const {receipt_id} = req.params;

    const getReceipt = await prisma.receipts.findUnique({
        where: {receipt_id:receipt_id}
    })

     if (getReceipt != null){
        await prisma.receipts.delete({
            where: {receipt_id}
        })
        res.status(200).json({success:true, message: 'Receipt deleted successfully.'})
     } else{
        res.status(500).json({success:false, message: 'Something went wrong. Server error'})
     }
   } catch (error) {
    res.status(500).json({success:false, message:error.message})
   }
}