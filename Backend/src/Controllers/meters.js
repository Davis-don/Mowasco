import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export const getAllMeters = async(req, res) => {
   try {
    const getMeters = await prisma.meters.findMany({
        select: {
            meter_id: true,
            meterNumber: true,
            zone: true
        }
    })
    if (getMeters != null) {
        res.status(200).json({success:true, message: 'All meters have been found successfully.', data: getMeters})
    } else{
        res.status(500).json({success:false, message: 'Something went wrong.'})
    }
   } catch (error) {
    res.status(500).json({success:false, message:error.message})
   }
}

export const getSingleMeter = async(req, res) => {
    try {
        const {meter_id} = req.params;

        const checkMeter = await prisma.meters.findUnique({
            where: {meter_id}
        })

        if (checkMeter){
            res.status(200).json({success:true, message: 'Meter has been found successfully.', data: checkMeter})
        } else{
            res.status(500).json({success:false, message: 'Meter not found.'})
        }



    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const createNewMeter = async(req, res) => {
    try{
        const {meterNumber, zone} = req.body;

        const createMeter = await prisma.meters.create({
            data: {
                meterNumber, zone
            }
        })

        if(createMeter != null) {
            res.status(200).json({success:true, message:'Meter created successfully.', data: createMeter})
        } else{
            res.status(500).json({success:true, message:'Something went wrong.', data: createMeter})
        }

    } catch(error) {
        res.status(500).json({success: false, message: error.message})
    }
}


export const updateMeter = async(req, res) => {
    res.json('Update meter.')
}

export const deleteMeter = async(req, res) => {
    try {
        const {meter_id} = req.params;
        await prisma.meters.delete({
            where:{meter_id}
        })

        
        res.json('Meter deleted succesfully.')
    } catch (error) {
        res.status(500).json({success:false,message: error.message})
    }
}
