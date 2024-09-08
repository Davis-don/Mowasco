import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client } from 'pg';
import configurations from './Databaseconfig';
import EmployeesUser from './EmployeesUser'; // Replace require with import
import UserLogin from './Login'; // Replace require with import

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin or use a function for dynamic configuration
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, HTTP authentication) across domains
  optionsSuccessStatus: 204, // Set the response status for successful preflight requests
};
app.use(cors(corsOptions));

// Routes
app.use('/EmployeesUser', EmployeesUser);
app.use('/User/Login', UserLogin);

// Start server
app.listen(4000, (error) => {
  if (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the process with an error code
  }
  console.log('Listening on port 4000');
});
