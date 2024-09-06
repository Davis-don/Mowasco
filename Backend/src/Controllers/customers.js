import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const getAllCustomers = async (req,res) => {
    try{

        const getCustomers = await prisma.customers.findMany({
            select:{
                cust_id: true, 
                custFirstName: true, 
                custLastName: true,
                custID: true, 
                custPhoneNumber: true, 
                custConnectionType: true, 
                custStatus: true,
                zone:true
            }
        })

          if(getCustomers != null){
            res.status(200).json({success: true, message:'Customers found successfully.', data: getCustomers})
        } else {
            res.status(500).json({success: false, message:'Something went wrong.'})
        }
    } catch(error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const getSingleCustomer = async (req,res) => {
   try{
    const {cust_id} = req.params;
    const checkID = await prisma.customers.findUnique({
        where: {cust_id: cust_id}
    })

    if(checkID){
        res.status(200).json({success: true, message: 'Customer has been found.', data:checkID})
    } else {
        res.status(500).json({success: true, message: 'Customer not found'})
    }
   } catch(error) {
    res.status(500).json({success: false, message: error.message})
   }
}

export const createCustomer = async (req,res) => {
    try{
        const {custFirstName, custLastName,custID, custPhoneNumber, custConnectionType } = req.body;

        const zoneID = 'f1e6667d-6ebe-4f5e-ba1f-e8753aef1fc1'
        const createCustomer = await prisma.customers.create({
            data: {
                
                custFirstName, 
                custLastName,
                custID, 
                custPhoneNumber, 
                custConnectionType, 
                zone: {
                    connect:{
                        zone_id:zoneID
                    }
                }
            }
        })

        if(createCustomer != null){
            res.status(200).json({success: true, message:'Customer created successfully.'})
        } else {
            res.status(500).json({success: false, message:'Something went wrong.'})
        }

    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}
export const updateCustomer =  async (req,res) => {
    res.json('Update customer')
}

export const deleteCustomer = async (req,res) => {
    try{
    const {cust_id} = req.params;
    const checkID = await prisma.customers.findUnique({
        where: {cust_id: cust_id}
    })

    if(checkID){
        await prisma.customers.delete({
        where: {cust_id: cust_id}
    })
        res.status(200).json({success: true, message: 'Customer has been deleted.'})
    } else {
        res.status(500).json({success: true, message: 'Customer not found'})
    }

    

        // res.status(200).json({success: true, message: 'Customer has been deleted successfully.'})
   } catch(error) {
    res.status(500).json({success: false, message: error.message})
   }
}

