import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const getAllBills = async(req, res)=>{
   try{
    const getBills = await prisma.billing.findMany({
        select: {
           bill_id:true,
           billingPeriod:true,
           billingDate: true,
           amountDue: true,
           consumption:true,
           meters:true,
           customer:true
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

        const checkBill = await prisma.billing.findUnique({
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
        const {billingPeriod,  consumption,  amountDue, cust_id, meter_id  } = req.body;

        let custID = '5da90084-ab2a-4b74-af15-537fd6d910e3'
        let meterID = 'c46ab4e5-92fd-4b60-9a47-4c5b1a8369d1'
        const createBill = await prisma.billing.create({
            data: {
                billingPeriod,
                consumption,
                amountDue,
                meters:{
                    connect: {
                        meter_id: meterID
                    }
                },
                customer:{
                    connect:{
                        cust_id: custID
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