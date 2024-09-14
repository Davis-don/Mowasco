import express from "express";
const Routes = express.Router();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const insertEmployeeToDatabase = async (dataObject) => {
  try {
    // Check whether the password and confirm password match
    if (dataObject.Password !== dataObject.ConfirmPassword) {
      console.error('Error: Password and Confirm Password do not match');
      return {
        status: 200,
        message: "Failed! Password and Confirm Password do not match."
      };
    }

    // Add employee to the database
    
    const newEmployee = await prisma.employee.create({
      data: {
        Employees_Id: dataObject.Employees_Id, 
        FullNames: dataObject.FullNames,
        Gender: dataObject.Gender,
        Age: parseInt(dataObject.Age, 10),
        contact: dataObject.Contact,
        Password: dataObject.Password,
        Status: dataObject.Status,
        Role: dataObject.Role
      }
    });

    return {
      status: 200,
      message: "Employee added successfully"
    };
    
   console.log('executed')
  } catch (error) {
    console.error('Database Insertion Error:', error);
    return {
      status: 500,
      message: "Failed! Error inserting employee into the database."
    };
  }
};

// Route to add a new employee
Routes.post('/Add/Employee', async (req, res) => {
  const DataReturned = await insertEmployeeToDatabase(req.body); // Insert data into the table
  res.status(DataReturned.status).json({ message: DataReturned.message });
});

export default Routes;













// import express from "express"
// const Routes=express.Router();
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// const insertEmployeeToDatabase =async (dataObject)=>{
//   try{
//    //1:Check whether the password and confirm password matches
//     if (dataObject.Password !== dataObject.ConfirmPassword) {
//       console.error('Error: Password and Confirm Password do not match');
//       return {
//         status:200,
//         message:"failed !!! password do not match"
//       };
//     }
//     //2 Add user in the database

//     //start of function to insert user in the database
//  const newUser= await prisma.user.create({
//   data:{
//     EmployeeId: dataObject.EmployeeId,
//   FullNames: dataObject.FullNames,
//   Gender:dataObject.Gender,
//   Age:dataObject.Age,
//   Contact:dataObject.Contact,
//   Password:dataObject.Password,
//   ConfirmPassword:dataObject.ConfirmPassword,
//    Status:dataObject.Status,
//    Role:dataObject.Role
//   }
//  })
//  newUser();
//   return {
//     status:200,
//     message:"User added succesfully"
//   }
//   }
//   catch(error){
//     console.log(error);
//   }
// }

// //End of function to insert user in the database

// Routes.post('/Add/User', async (req,res)=>{
//   let DataReturned=await insertEmployeeToDatabase(req.body);// Insert data into the table;
//   res.status(DataReturned.status).json({message:DataReturned.message});

    
// })




// export default Routes;