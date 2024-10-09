<<<<<<< HEAD
const express = require("express");
const Routes = express.Router();
const { Client } = require("pg");
const configurations = require("./Databaseconfig");

// Database client setup
const client = new Client(configurations);

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Create table  EMPLOYEES TABLE function
async function createEmployeesTable() {
  try {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Employees_tbl (
          Employees_Id INT PRIMARY KEY,
          FullNames VARCHAR(255) NOT NULL,
          Gender VARCHAR(10) NOT NULL,
          Age INT NOT NULL,
          contact VARCHAR(50) NOT NULL,
          Status VARCHAR(10) NOT NULL,
          Role VARCHAR(10) NOT NULL,
          Password VARCHAR(10) NOT NULL
        )
      `;
    await client.query(createTableQuery);
    console.log("Employees table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

//FUNCTION TO DROP THE WHOLE TABLE
async function dropEmployeesTable() {
  try {
    // SQL query to drop the table if it exists
    const dropTableQuery = `
        DROP TABLE IF EXISTS Employees_tbl;
      `;

    // Execute the query
    await client.query(dropTableQuery);
    console.log("Employees table dropped successfully");
  } catch (err) {
    console.error("Error dropping table:", err);
  } finally {
    // Close the database connection
    await client.end();
  }
}

// DROP ALL RECORDS FROM EMPLOYEES TABLE function
async function deleteAllRecordsFromEmployeesTable() {
  try {
    const deleteRecordsQuery = `
        DELETE FROM Employees_tbl
      `;
    await client.query(deleteRecordsQuery);
    console.log("All records deleted successfully");
  } catch (err) {
    console.error("Error deleting records:", err);
  }
}
=======

import express from "express";
const Routes = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
const saltRounds=10
>>>>>>> 088cd13ce05f6ef5a88edd2577d0df9cbecbf9af

//FUNCTION TO ADD USER IN THE EMPLOYEES TABLE
async function insertEmployeeToDatabase({
  EmployeeId,
  FullNames,
  Gender,
  Age,
  Contact,
  Password,
  ConfirmPassword,
  Status,
  Role,
}) {
  try {
    // Check if the password and confirm password match
    if (Password !== ConfirmPassword) {
      console.error("Error: Password and Confirm Password do not match");
      return {
        status: 200,
        message: "failed !!! password do not match",
      };
    }

<<<<<<< HEAD
    // Proceed to insert the data if the passwords match
    const insertQuery = `
        INSERT INTO Employees_tbl (Employees_Id, FullNames, Gender, Age, contact, Status, Role, Password)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;

    const insertValues = [
      EmployeeId,
      FullNames,
      Gender,
      Age,
      Contact,
      Status,
      Role,
      Password,
    ];
    await client.query(insertQuery, insertValues);

    console.log("Employee record added successfully");
    return {
      status: 200,
      message: "User added succesfully",
    };
  } catch (err) {
    console.error("Error inserting employee record:", err);
    return {
      status: 404,
      message: err,
    };
  }
}

//FUNCTION TO GET ALL USERS IN THE EMPLOYEES TABLE
async function getAllEmployees() {
  try {
    const getRecordsQuery = `
        SELECT * FROM Employees_tbl
      `;
    const result = await client.query(getRecordsQuery);

    if (result.rows.length > 0) {
      console.log("Employees retrieved successfully");
      return result.rows;
    } else {
      console.log("No employees found");
      return [];
    }
  } catch (err) {
    console.error("Error retrieving employees:", err);
    throw err; // Optionally, rethrow the error to handle it elsewhere
  }
}

Routes.post("/Add/User", async (req, res) => {
  await createEmployeesTable();
  let DataReturned = await insertEmployeeToDatabase(req.body); // Insert data into the table;
  res.status(DataReturned.status).json({ message: DataReturned.message });
});
Routes.post("/Remove/Users", (req, res) => {});
Routes.get("/Get/All/Users", async (req, res) => {
  console.log(await getAllEmployees()); // GET ALL EMPLOYEES DATA FROM TABLE
});
Routes.get("/remove/All/Users", async (req, res) => {
  await deleteAllRecordsFromEmployeesTable(); //remove all users;
  // await dropEmployeesTable();
});

Routes.get("/", async (req, res) => {
  //console.log(req.body);
  try {
    //await createEmployeesTable(); // Ensure the table exists
    res.end("welcome to employeeuser");
  } catch (error) {
    console.log(error);
  }
});

// Routes.get('/',(req,res)=>{
//     res.send("heloooo testet")
// })

module.exports = Routes;
=======

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
>>>>>>> 088cd13ce05f6ef5a88edd2577d0df9cbecbf9af
