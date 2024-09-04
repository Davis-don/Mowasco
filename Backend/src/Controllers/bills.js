import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const getAllBills = async(req, res)=>{
   try{
    const getBills = await prisma.bills.findMany({
        select: {
            bill_id: true,
            cust_id: true,
            currentReading: true,
            prevReading: true, 
            consumption:true,  
            balance: true, 
            totalCharges: true 
        }
    })
    if (getBills){
            res.status(200).json({success: true, message: 'All bills found successfully.', data: getBills})
        } else{
            res.status(500).json({success: false, message: 'Something went wrong.'})
        }

   } catch(error) {
    res.status(500).json({success: false, message: error.message})
   }
}

export const getSingleBill = async(req, res)=>{
    try{
        const {bill_id} = req.params;

        const checkBill = await prisma.bills.findUnique({
            where: {bill_id: bill_id}
        })
         if (checkBill){
            res.status(200).json({success: true, message: 'Bill found successfully.', data: checkBill})
        } else{
            res.status(500).json({success: false, message: 'Something went wrong.'})
        } 

    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

export const createBill = async(req, res)=>{
    
    try{
        const {cust_id, currentReading,prevReading, consumption,  balance, totalCharges  } = req.body;

        // fetch the last meter reading.
        const lastReading = await prisma.bills.findFirst({
            where: {cust_id: cust_id},
            orderBy: {createdAt: 'desc'}
        })

        let consumedAmount = 0;
        if ( lastReading) {
            consumedAmount = currentReading - lastReading.currentReading
        }


        const createBill = await prisma.bills.create({
            data: {
                currentReading,
                prevReading: lastReading ? lastReading.currentReading : 0,
                consumption: consumedAmount, 
                balance, 
                totalCharges,
                customer:{
                    connect:{
                        cust_id: cust_id
                    }
                }
            }
        })
        if (createBill){
            res.status(200).json({success: true, message: 'Bill created successfully.'})
        } else{
            res.status(500).json({success: false, message: 'Something went wrong.'})
        }
    } catch(error) {
        res.status(500).json({success:false, message: error.message})
    }
}


export const updateBill = async(req, res)=>{
    res.json('update bill')
}





export const deleteBill = async(req, res)=>{
      try{
        const {bill_id} = req.params;

        const checkBill = await prisma.bills.findUnique({
            where: {bill_id: bill_id}
        })
         if (checkBill){
            await prisma.bills.delete({
                where: {bill_id: bill_id}
            })
            res.status(200).json({success: true, message: 'Bill deleted successfully.', data: checkBill})
        } else{
            res.status(500).json({success: false, message: 'Something went wrong.'})
        } 

    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}