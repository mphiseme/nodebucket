/**
 Title Index.js
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description: Nodebucket project
 */

/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const EmployeeAPI = require('./routes/employee-api');
const config = require('./data/config.json');

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN = config.dbConn;

/**
 * Check Database connection.
 */
mongoose.set('strictQuery', false);

mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
},
err => {
  console.log(config.mongoServerError  + ':' + err.message);
});

mongoose.connection.on('error', err => {
  console.log(config.mongoServerError + ':' + err.message)
})

mongoose.connection.on('disconnected', () =>{
  console.log('Server disconnected from host (MongoDB Atlas).');
})

/**
 * APIS go here
 */
app.use('/api/employees', EmployeeAPI);

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
