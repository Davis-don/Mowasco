import { Router } from "express"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const router = Router()

router.post('/search-customer', async(req, res) => {
    
    try {
        const {meterNumber,zones} = req.body;
        const search = await prisma.meters.findFirst({
            where:{
                meterNumber,
               zones:{
               zone_id: zones
               }
            },
            include:{
            customer:true,
            zones: true
        }
        })
        console.log(search)

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