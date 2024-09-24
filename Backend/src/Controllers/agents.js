import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import  bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();

export const registerAgent = async(req, res) => {
    try {
        const {employeeId,firstName, lastName, gender, age, contact, password} = req.body;
        let passToString =''
        if(password !== null){
            passToString = password.toString();
        }
         const passwordHash = bcrypt.hashSync(passToString, 10);
         console.log('hashed', passwordHash)
        const register = await prisma.agents.create({
            data:{
                employeeID:parseInt(employeeId),
                first_name: firstName, 
                lastName, 
                 age:parseInt(age),
                  contact:parseInt(contact),
                   password: passwordHash
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
try {
    const {password, employeeID} = req.body;

    // first find if the employee id is present in the database.
    const verifyID = await prisma.agents.findFirst({
        where:{employeeID: employeeID}
    })
    
    if (verifyID) {
        const matchPassword = bcrypt.compareSync(password, verifyID.password)

       if (matchPassword === true){
           const payload = {
          agent_id: verifyID.agent_id,
          first_name: verifyID.first_name,
          lastName: verifyID.lastName,
          contact: verifyID.contact,
          age: verifyID.age,
          status: verifyID.status,
          role: verifyID.role,
        };

        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
          expiresIn: "3600m",
        });

        console.log('toke', token)

        res.cookie('_token', token , {httpOnly: true,  secure: true} )
         res.status(200).json({ success: true, message: "Customer created successfully.", data:payload});
      
        } else{
            res
              .status(404)
             .json({ success: false, message: "Wrong user credentials." });
    }
    }else{
         res
          .status(400)
          .json({ success: false, message: "Customer not found" });
      
    }

   

} catch (error) {
    res.status(500).json({success:false, message: error.message})
}
}