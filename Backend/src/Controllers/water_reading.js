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
        const {reading_id} = req.params;
        const findReading = await prisma.water_Reading.findFirst({
            where:{reading_id}
        })

        if(findReading != null) {
            res.status(200).json({success:true, message:'Meter reading has been found successfully.', data:findReading})
        } else{
            res.status(500).json({success:false, message:'Something went wrong.'})
        }
    } catch (error) {
            res.status(500).json({success:false, message:error.message})
    }
}

export const recordReading = async(req,res) => {
    const meterID = '3d14658c-659f-4379-a103-5a78549832f4'
   try{
    const {meter_id, currentReading, prevReading, consumption} = req.body;

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