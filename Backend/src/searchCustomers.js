import { Router } from "express"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const router = Router()

router.post('/search-customer', async(req, res) => {
    
    try {
        const {meterNumber,zones} = req.body;
        const zoneID = 'f1e6667d-6ebe-4f5e-ba1f-e8753aef1fc1'
        const custID = '5539ea35-6d27-445a-bdb1-9e6f6bab6f13'
        const search = await prisma.meters.findFirst({
            where:{
                meterNumber,
               zones:{
               zoneName: zones
               }
            },
             include:{
            customer:true,
            zones: true
        }
        })

        if(search != null) {
            res.status(200).json({success:true, message: 'User found succesffully.',data:search})
        } else{
            res.status(500).json({success:false, message: 'Something went wrong.'})

        }
    } catch (error) {
        res.status(500).json({success:false, message: error.message})

    }
})

export default router