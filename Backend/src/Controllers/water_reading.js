import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllReadings  = async(req,res) => {
    res.json('sdklsklds')
}

export const getSigleReading = async(req,res) => {
    res.json('single water reading.')
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
    res.json('delete water reading.')
}