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
const config = require('./data/config.json');

const app = express(); // Express variable.

/**
 * The framework we need to run swagger
 */
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const EmployeeAPI = require('./routes/employee-api');


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
  console.log('Connection to the database was successful'); // message when app is connected to database mongodb
},
err => {
  console.log(config.mongoServerError  + ':' + err.message);
});

mongoose.connection.on('error', err => {
  console.log(config.mongoServerError + ':' + err.message)// message when app is disconnected to database mongodb
})

mongoose.connection.on('disconnected', () =>{
  console.log('Server disconnected from host (MongoDB Atlas).'); // message when app is disconnected from mongodb
})

/**
 * APIS go here
 */

const options = {
  definition: {
    openapi: '3.0.0',
    explorer: true,
  info: {
    title: 'WEB 450 RESTful APIs',
    version: '1.0.0',
  },
  },

   /**
   * Route to the api doc.
   */
   apis: ['./server/routes/employee-api.js'],
};
let openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use('/api/employees', EmployeeAPI);

// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
