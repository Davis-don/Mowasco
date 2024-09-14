
import express from "express";
const Routes = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds=10



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

    // Hash the password
    const hashedPassword = await bcrypt.hash(dataObject.Password, saltRounds);

    // Add employee to the database
    const newEmployee = await prisma.employee.create({
      data: {
        Employees_Id: parseInt(dataObject.EmployeeId) ,
        FullNames: dataObject.FullNames,
        Gender: dataObject.Gender,
        Age: parseInt(dataObject.Age, 10),
        contact: dataObject.Contact,
        Password: hashedPassword, // Store hashed password
        Status: dataObject.Status,
        Role: dataObject.Role
      }
    });

    return {
      status: 200,
      message: "Employee added successfully"
    };
    
  } catch (error) {
    console.error('Database Insertion Error:', error);
    return {
      status: 500,
      message: "Failed! Error inserting employee into the database."
    };
  }
};

Routes.post('/Add/Employee', async (req, res) => {
  const DataReturned = await insertEmployeeToDatabase(req.body); // Insert data into the table
  res.status(DataReturned.status).json({ message: DataReturned.message });
  //console.log(req.body)
});

export default Routes;
