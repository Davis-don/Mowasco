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







  module.exports=Routes;