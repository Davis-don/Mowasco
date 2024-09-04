import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Router } from "express";

const router = Router()

router.get('/all', async(req, res) =>{
    try {
        const getZones = await prisma.zones.findMany({
            select:{
                zone_id: true,
                zoneName:true
            }
        })

         if (getZones){
            res.status(200).json({success:true, message:'Zones found successfully.', data:getZones})
        } else{
            res.status(500).json({success:false, message:'Something went wrong!'})
        }
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
})

router.get('/:zone_id', async(req, res) =>{
    try {
        const {zone_id} = req.params;

        const getZone = await prisma.zones.findUnique({
            where: {zone_id}
        })

         if (getZone){
            res.status(200).json({success:true, message:'Zone found successfully.', data:getZone})
        } else{
            res.status(500).json({success:false, message:'Something went wrong!'})
        }
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
})

router.post('/create', async(req, res) =>{
    try {
        // const {zoneName} = req.body;

        const createZone = await prisma.zones.create({
            data:{...req.body}
        })

        if (createZone){
            res.status(200).json({success:true, message:'Zone created successfully.'})
        } else{
            res.status(500).json({success:false, message:'Something went wrong!'})
        }

    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
})

router.delete('/:zone_id', async(req, res) =>{
  try {
        const {zone_id} = req.params;

        const getZone = await prisma.zones.findUnique({
            where: {zone_id}
        })

         if (getZone){
            await prisma.zones.delete({
                where: {zone_id}
            })

            res.status(200).json({success:true, message:'Zone deleted successfully'})
        } else{
            res.status(500).json({success:false, message:'Something went wrong!'})
        }
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }
})

export default router