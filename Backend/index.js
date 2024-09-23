// const express = require ('express');
import express from 'express'
import cors from 'cors'
// const cors = require('cors');
import bodyParser from 'body-parser'
// const bodyParser = require('body-parser');
// const { Client } = require('pg');
// import { Client } from 'pg'
import pkg from 'pg';
const { Client } = pkg;
import customers from './src/Routers/create_customers.js';
import bills from './src/Routers/bills.js';
import waterReading from './src/Routers/water_reading.js';
import meters from './src/Routers/meters.js';
import zones from './src/Routers/zones.js';
import receipts from './src/Routers/receipts.js';
import searchCustomers from './src/searchCustomers.js';
// const configurations = require('./Databaseconfig');
import configurations from './Databaseconfig'
import Routes from './Login.js'
import agents from './src/Routers/agents.js'
import { config  } from 'dotenv';

config()
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin or use a function for dynamic configuration
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, HTTP authentication) across domains
  optionsSuccessStatus: 204,
 // Set the response status for successful preflight requests
};
app.use(cors(corsOptions));



// const EmployeesUser=require('./EmployeesUser');
// app.use('/EmployeesUser',EmployeesUser);
// const UserLogin=require('./Login');
app.use('/User/Login',Routes);

  // Start server
app.listen(4000, (error) => {
    if (error) {
      console.error('Error starting server:', error);
      process.exit(1); // Exit the process with an error code
    }
    console.log('Listening on port 4000');
  });

  app.use('/user', agents)
  app.use('/api/customers', searchCustomers)
  app.use('/customers',customers)
  app.use('/customer/reading', waterReading)
  app.use('/meters', meters)
  app.use('/zones', zones)
  app.use('/customer/bill', bills)
  app.use('/customer/receipt', receipts)