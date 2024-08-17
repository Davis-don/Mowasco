const express = require ('express');
const Routes=express.Router();
const { Client } = require('pg');
const configurations = require('./Databaseconfig');

// Database client setup
const client = new Client(configurations);

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Create table  EMPLOYEES TABLE function
async function createEmployeesTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Employees_tbl (
          Employees_Id INT PRIMARY KEY,
          FullNames VARCHAR(255) NOT NULL,
          Gender CHAR(10) NOT NULL,
          Age INT NOT NULL,
          contact VARCHAR(50) NOT NULL,
          Status CHAR(10) NOT NULL,
          Role char(10) NOT NULL,
          Password VARCHAR(10) NOT NULL
        )
      `;
      await client.query(createTableQuery);
      console.log("Employees table created successfully");
    } catch (err) {
      console.error('Error creating table:', err);
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
      console.error('Error deleting records:', err);
    }
  }


  
  //FUNCTION TO ADD USER IN THE EMPLOYEES TABLE
  async function insertEmployeeToDatabase({ EmployeeId, FullNames, Gender, Age, Contact, Password, ConfirmPassword, Status, Role }) {
    try {
      // Check if the password and confirm password match
      if (Password !== ConfirmPassword) {
        console.error('Error: Password and Confirm Password do not match');
        return {
          status:200,
          message:"failed !!! password do not match"
        };
      }
  
      // Proceed to insert the data if the passwords match
      const insertQuery = `
        INSERT INTO Employees_tbl (Employees_Id, FullNames, Gender, Age, contact, Status, Role, Password)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
  
      const insertValues = [EmployeeId, FullNames, Gender, Age, Contact, Status, Role, Password];
      await client.query(insertQuery, insertValues);
      
      console.log("Employee record added successfully");
      return {
        status:200,
        message:"User added succesfully"
      }
    } catch (err) {
      console.error('Error inserting employee record:', err);
      return {
        status:404,
        message:err
      }
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
      console.error('Error retrieving employees:', err);
      throw err; // Optionally, rethrow the error to handle it elsewhere
    }
  }
  


Routes.post('/Add/User', async (req,res)=>{
  let DataReturned=await insertEmployeeToDatabase(req.body);// Insert data into the table;
  res.status(DataReturned.status).json({message:DataReturned.message});
 
})
Routes.post('/Remove/Users',(req,res)=>{
  
})
Routes.get('/Get/All/Users', async (req,res)=>{
   console.log(await getAllEmployees())  // GET ALL EMPLOYEES DATA FROM TABLE
})
Routes.get('/remove/All/Users', async (req,res)=>{
  await deleteAllRecordsFromEmployeesTable() //remove all users;
})

























  Routes.get('/', async (req, res) => {
//console.log(req.body);
try{
    //await createEmployeesTable(); // Ensure the table exists
    res.end('welcome to employeeuser');
}
catch(error){
    console.log(error);
}
})


// Routes.get('/',(req,res)=>{
//     res.send("heloooo testet")
// })



module.exports=Routes;