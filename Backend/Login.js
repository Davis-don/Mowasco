import express, { response } from "express";
const Routes = express.Router();
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();


//security key
const SECRET_KEY = process.env.SECRET_KEY;

const checkUserCredentials = async (authorizationObject) => {
  try {

  console.log(authorizationObject)
     const { UserId, Password } = authorizationObject;

    // // Ensure that UserId and password are provided
    if (!UserId || !Password) {
      throw new Error('UserId and password must be provided.');
    }

    // Fetch a single user by Employees_Id (unique field)
    const user = await prisma.employee.findUnique({
      where: {
        Employees_Id: parseInt(UserId) // Correct unique field name
      }
    });

    // If user exists, compare the provided password with the stored hashed password
    if (user && await bcrypt.compare(Password, user.Password)) {
      return true; // Password matches
    } else {
      return false; // No match found
    }
  } catch (err) {
    console.error('Error checking user credentials:', err);
    throw err; // Handle error appropriately
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma
  }
};
  
//get user role function

const getUserRoleById = async (userId) => {
    try {
      // Fetch the user by ID and select the role field
      const user = await prisma.employee.findUnique({
        where: {
            Employees_Id: userId
        },
        select: {
          Role: true // Select only the role field
        }
      });
  
      if (user) {
        return user.Role; // Return the role field value
      } else {
        return null; // Return null if user is not found
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw error; // Rethrow error to be handled by the caller
    } finally {
      await prisma.$disconnect(); // Ensure the Prisma Client is disconnected
    }
  };
//end of user role by is


const getEmployeeStatus = async (employeeId) => {
  try {
    // Fetch the employee by Employees_Id and select only the Status field
    const employee = await prisma.employee.findUnique({
      where: {
        Employees_Id: employeeId, // Unique field
      },
      select: {
        Status: true, // Only select the Status field
      },
    });

    // Return true if status is "active", otherwise return false
    return employee && employee.Status === 'active';
  } catch (error) {
    console.error('Error fetching employee status:', error);
    return false; // Return false on error
  } finally {
    await prisma.$disconnect(); // Always disconnect Prisma
  }
};





//start of get user status
// const getEmployeeStatus = async (employeeId) => {
//   try {
//     // Fetch the employee by Employees_Id and select only the Status field
//     const employee = await prisma.employee.findUnique({
//       where: {
//         Employees_Id: employeeId, // Unique field
//       },
//       select: {
//         Status: true, // Only select the Status field
//       },
//     });

//     // Check if the employee was found and return the status
//     if (employee) {
//       return {
//         status: 200,
//         statusMessage: employee.Status,
//       };
//     } else {
//       return {
//         status: 404,
//         message: 'Employee not found',
//       };
//     }
//   } catch (error) {
//     console.error('Error fetching employee status:', error);
//     return {
//       status: 500,
//       message: 'Error fetching employee status',
//     };
//   } finally {
//     await prisma.$disconnect(); // Always disconnect Prisma
//   }
// };
// //end of get user status
const getAllEmployees = async () => {
    try {
      // Fetch all employees from the Employee table
      const employees = await prisma.employee.findMany();
      return employees;
    } catch (err) {
      console.error('Error fetching employees:', err);
      throw err; // Handle the error appropriately
    } finally {
      await prisma.$disconnect(); // Always disconnect Prisma
    }
  };

  async function deleteAllUsers() {
    try {
      // Delete all users from the Employee table
      const deleteResult = await prisma.employee.deleteMany({});
      console.log(`Deleted ${deleteResult.count} users.`);
    } catch (error) {
      console.error('Error deleting users:', error);
    } finally {
      await prisma.$disconnect();
    }
  }











Routes.post('/',async (req,res)=>{
  if(await checkUserCredentials(req.body)){
    if(await getEmployeeStatus(parseInt(req.body.UserId))){
      const token = jwt.sign({userId:parseInt(req.body.UserId)}, SECRET_KEY, { expiresIn: '1h' });
// console.log(token);
res.status(200).json({ Token:token,message:"Login successful",userRole:await getUserRoleById(parseInt(req.body.UserId)) });
    }
    else{
      res.status(200).json({message:"Access denied"});
    }
  }
  else{
    res.status(200).json({message:"User not found"});
  }
     
})







export default Routes;