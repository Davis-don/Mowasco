// const express = require ('express');
import express from 'express'
// const Routes=express.Router();
import { Router } from 'express';
const Routes = Router()
//  const { Client } = require('pg');
// import { Client } from 'pg';
import pkg from 'pg';
const { Client } = pkg;

// const configurations = require('./Databaseconfig');
import configurations from './Databaseconfig';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'

// Database client setup
const client = new Client(configurations);
//security key
const SECRET_KEY = process.env.SECRET_KEY;
// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));


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
      console.error('Error retrieving user role:', err);
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
      return userStatus == 'active';
    } else {
      // Return false if the user was not found
      return false; // or throw new Error('User not found');
    }
  } catch (err) {
    console.error('Error retrieving user status:', err);
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
    console.error('Error checking user credentials:', err);
    throw err;
  }
}


 Routes.post('/',async (req,res)=>{
  const {UserId, Password}=req.body;
//authenticate user by username and id
  if(await checkUserCredentials(UserId, Password)){
    //check user status
    if(await getUserStatus(UserId)){
// Generate a JWT token
const token = jwt.sign({userId:UserId}, SECRET_KEY, { expiresIn: '1h' });
res.cookie('access_token', token)
// console.log(token);
res.status(200).json({ Token:token,message:"Login successful",userRole:await getUserRole(UserId) });
    }
    else{
      res.status(200).json({message:"Access denied"});
    }
  }
  else{
  res.status(200).json({message:"User not found"});
  }
 })


export default Routes