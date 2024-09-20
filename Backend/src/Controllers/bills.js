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
           customer:true,
           meters:true,
           arrears:true,
           waterBill:true,
           otherCharges:true,
           reconnection:true,
           receipts:true

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

export const getCustomersBills = async(req, res)=>{
    try{
        const {cust_id} = req.params;

        const checkBill = await prisma.billing.findMany({
            where: {cust_id},
            orderBy: {billingDate:'desc'},
            include:{
                customer:true,
                customer:{
                    include:{
                        meters:true,
                        meters:{
                            include:{
                                zones:true
                            }
                        }
                    }
                },
                receipts:true
            }
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

export const getSingleBill = async(req, res)=>{
    try{
        const {bill_id} = req.params;

        const checkBill = await prisma.billing.findUnique({
            where: {bill_id: bill_id},
            include:{
                customer:true,
                customer:{
                    include:{
                        meters:true,
                        meters:{
                            include:{
                                zones:true
                            }
                        }
                    }
                }
            }
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
        const {billingPeriod,  consumption,  cust_id, meter_id} = req.body;
        const amoutPayable = await prisma.water_Reading.findFirst({
            where:{meter_id},
            orderBy:{createdAt:'desc'}
        })

        console.log('amount payable', amoutPayable)

        let totalCharges = 0;
        if(amoutPayable){
                totalCharges = amoutPayable.consumption * 123
        }
   
        const createBill = await prisma.billing.create({
            data: {
                billingPeriod,
                consumption,
                amountDue: totalCharges,
                customer:{
                    connect:{
                        cust_id: cust_id
            }
                },
                meters:{
                    connect:{
                        meter_id:meter_id
                    }
                }
            }
        })
        if (createBill){
            res.status(200).json({success: true, message: 'Bill created successfully.', data:createBill})
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

        const checkBill = await prisma.billing.findUnique({
            where: {bill_id}
        })
         if (checkBill){
            await prisma.billing.delete({
                where: {bill_id}
            })
            res.status(200).json({success: true, message: 'Bill deleted successfully.'})
        } else{
            res.status(500).json({success: false, message: 'Something went wrong.'})
        } 

    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}