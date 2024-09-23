import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const registerAgent = async(req, res) => {
    try {
        const {employeeId,firstName, lastName, gender, age, contact, password} = req.body;
        console.log(typeof(employeeId))
        const register = await prisma.agents.create({
            data:{
                employeeID:parseInt(employeeId),
                first_name: firstName, 
                lastName, 
                 age:parseInt(age),
                  contact:parseInt(contact),
                   password: parseInt(password)
            }
        })

        if (register != null){
            res.status(200).json({success:true, message:'User created successully.', data:register})
        } else{
            res.status(500).json({success:true, message:'User created successully.'})

        }

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
    
}

export const loginAgent = async(req, res) => {
   
}