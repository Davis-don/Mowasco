import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllReadings  = async(req,res) => {
    try {
        const getMeters = await prisma.water_Reading.findMany({
            select: {
                meter_id:true,
                reading_id: true,
                currentReading:true, 
                prevReading: true,
                consumption:true,   
                createdAt: true
            }
        })
        
        if(getMeters != null) {
            res.status(200).json({success:true, message:'All readings have been found successfully.', data:getMeters})
        } else{
            res.status(500).json({success:false, message:'Something went wrong.'})
        }
    } catch (error) {
        res.status(500).json({success:false,message: error.message})
    }
}

export const getSigleReading = async(req,res) => {
    try {
        const { custID} = req.params;
     
        const findReading = await prisma.water_Reading.findFirst({
            where:{custID},
        })

        if(findReading != null) {
            res.status(200).json({success:true, message:'Meter reading has been found successfully.', data:findReading})
        } else{
            res.status(500).json({success:false, message:'Something went wrong. no details'})
        }
    } catch (error) {
            res.status(500).json({success:false, message:error.message})
    }
}

export const recordReading = async(req,res) => {
    const meterID = '6af3d56e-3990-476e-a92a-27ae46b44df6'
    const custID = 'd55ec1ac-6e8a-4e14-bff8-e9173bf9b254'
   try{
    const { currentReading, prevReading, cust_id} = req.body;

    const lastReading = await prisma.water_Reading.findFirst({
        where: {meter_id: meterID},
        orderBy:{createdAt: 'desc'}
    })

    let amountConsumed = 0
    if(lastReading){
        amountConsumed = currentReading - prevReading;
    }else{
        amountConsumed = currentReading
    }

    const createReading = await prisma.water_Reading.create({
        data: {
            currentReading,
            prevReading: lastReading ? currentReading : 0,
            consumption: amountConsumed,
            meter:{
                connect:{meter_id:meterID}
            },
            customer:{
                connect:{
                    cust_id:cust_id
                }
            }
        }
    })

    if (createReading != null){
        res.status(200).json({success: true, message:'Water reading recorded.', data: createReading})
    } else{
        res.status(500).json({success: false, message:'Something went wrong.'})
    }
   }catch(error) {
    res.status(500).json({success: false, message: error.message})
   }
}

export const deleteReading = async(req,res) => {
 try {
        const {reading_id} = req.params;
        const findReading = await prisma.water_Reading.findUnique({
            where:{reading_id}
        })

        if(findReading != null) {
               await prisma.water_Reading.delete({
            where:{reading_id}
        })
            res.status(200).json({success:true, message:'Meter reading deleted successfully.'})
        } else{
            res.status(500).json({success:false, message:'Something went wrong.'})
        }

        
    } catch (error) {
            res.status(500).json({success:false, message:error.message})
    }
}