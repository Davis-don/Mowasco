import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllReceipts = async(req, res) => {
    res.send('Get all the receipts.')
}

export const getSingleReceipt = async(req, res) => {
    res.send('Get single receipts.')
}

export const generateReceipt = async(req, res) => {
    try {
        const {receiptNumber, amount_paid, Deadline_date, bill_id,meter_id, cust_id} = req.body;

        let custId = 'f3583c7d-3d74-49fe-9cbd-6f22e6ad5ac2'
        let meterID = '3d14658c-659f-4379-a103-5a78549832f4'
        let billID = 'c0304240-e78f-4ce8-abcc-b83a4ef6ce8e'

        const generate = await prisma.receipts.create({
            data:{
                receiptNumber,
                amount_paid, 
                Deadline_date,
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
            res.status(200).json({success: true, message:"Bill generated successfully."})
        } else{
            res.status(500).json({success: false, message:"Server error."})

        }
        
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
}

export const deleteReceipt =  async(req, res) => {
    res.send('Delete receipt.')
}