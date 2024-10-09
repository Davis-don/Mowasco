<<<<<<< HEAD
// const express = require ('express');
import express from "express";
// const Routes=express.Router();
import { Router } from "express";
const Routes = Router();
//  const { Client } = require('pg');
// import { Client } from 'pg';
import pkg from "pg";
const { Client } = pkg;

// const configurations = require('./Databaseconfig');
import configurations from "./Databaseconfig";
// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";
=======
import express, { response } from "express";
const Routes = express.Router();
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

>>>>>>> 088cd13ce05f6ef5a88edd2577d0df9cbecbf9af

//security key
const SECRET_KEY = process.env.SECRET_KEY;
<<<<<<< HEAD
// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

//function that checks the role of user
async function getUserRole(UserId) {
  try {
    // Query to get the role from the Employees_tbl where the Employees_Id matches the UserId
    const query = `
        SELECT Role FROM Employees_tbl
        WHERE Employees_Id = $1
      `;

    // Execute the query
    const result = await client.query(query, [UserId]);

    // Check if a user was found
    if (result.rows.length > 0) {
      // Return the role of the user
      const userRole = result.rows[0].role;
      return userRole;
    } else {
      // Return null or throw an error if the user was not found
      return null; // or throw new Error('User not found');
    }
  } catch (err) {
    console.error("Error retrieving user role:", err);
    throw err;
  }
}
//function that checks user Status
async function getUserStatus(UserId) {
  try {
    // Query to get the status from the Employees_tbl where the Employees_Id matches the UserId
    const query = `
      SELECT Status FROM Employees_tbl
      WHERE Employees_Id = $1
    `;

    // Execute the query
    const result = await client.query(query, [UserId]);

    // Check if a user was found
    if (result.rows.length > 0) {
      // Get the status of the user
      const userStatus = result.rows[0].status;

      // Return true if the status is 'active', false otherwise
      return userStatus == "active";
    } else {
      // Return false if the user was not found
      return false; // or throw new Error('User not found');
    }
  } catch (err) {
    console.error("Error retrieving user status:", err);
    throw err;
  }
}

//function that authenticates user
async function checkUserCredentials(UserId, Password) {
  try {
    const checkUserQuery = `
      SELECT * FROM Employees_tbl
      WHERE Employees_Id = $1 AND Password = $2
    `;

    const result = await client.query(checkUserQuery, [UserId, Password]);

    if (result.rows.length > 0) {
      console.log("User found in the database");
      return true; // User exists
    } else {
      console.log("User not found or invalid credentials");
      return false; // User does not exist or wrong credentials
    }
  } catch (err) {
    console.error("Error checking user credentials:", err);
    throw err;
  }
}

Routes.post("/", async (req, res) => {
  const { UserId, Password } = req.body;
  //authenticate user by username and id
  if (await checkUserCredentials(UserId, Password)) {
    //check user status
    if (await getUserStatus(UserId)) {
      // Generate a JWT token
      const token = jwt.sign({ userId: UserId }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("access_token", token);
      // console.log(token);
      res
        .status(200)
        .json({
          Token: token,
          message: "Login successful",
          userRole: await getUserRole(UserId),
        });
    } else {
      res.status(200).json({ message: "Access denied" });
=======

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
>>>>>>> 088cd13ce05f6ef5a88edd2577d0df9cbecbf9af
    }
  } else {
    res.status(200).json({ message: "User not found" });
  }
<<<<<<< HEAD
});

export default Routes;
=======
  else{
    res.status(200).json({message:"User not found"});
  }
     
})







export default Routes;
>>>>>>> 088cd13ce05f6ef5a88edd2577d0df9cbecbf9af
