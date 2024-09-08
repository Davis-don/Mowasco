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
            orderBy:{createdAt:'desc'}
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
   try{
    const { currentReading,meter_id} = req.body;

    const lastReading = await prisma.water_Reading.findFirst({
        where: {meter_id: meter_id},
        orderBy:{createdAt: 'desc'}
    })

    let amountConsumed = 0
    if(lastReading){
        amountConsumed = currentReading - lastReading.prevReading;        
    }else{
        amountConsumed = currentReading
    }


    const prev = currentReading - amountConsumed
    console.log(lastReading.prevReading)
    const createReading = await prisma.water_Reading.create({
        data: {
            currentReading,
            prevReading: lastReading ? (lastReading.currentReading) : 0,
            consumption: amountConsumed,
            meter:{
                connect:{meter_id:meter_id}
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