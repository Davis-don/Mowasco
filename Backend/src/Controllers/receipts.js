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
            billing:true,
            customer:{
                include: {
                    zone:true
                }
            }
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
        where: {receipt_id:receipt_id},
        include:{
            customer:true,
            customer:{
                include:{
                    zone:true
                }
            },
            meters:true, 
            billing:true
        }
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
        const { amount_paid, bill_id,meter_id, cust_id} = req.body;

        const generate = await prisma.receipts.create({
            data:{
                amount_paid, 
                billing:{
                    connect:{
                        bill_id:bill_id
                    }
                },
                meters: {
                    connect:{
                        meter_id:meter_id
                    }
                },
                customer: {
                    connect:{
                        cust_id:cust_id
                    }
                }
            }
        })

        if (generate != null){
            res.status(200).json({success: true, message:"Receipt generated successfully.", data:generate})
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