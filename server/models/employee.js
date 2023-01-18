/**
 Title Employee.js
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item')

//Schema model - to structure the data from database
let employeeSchema = new Schema({
  empId:{type:Number, unique:true, required:true},
  firstName: {type:String},
  lastName: {type: String},
  todo: [itemSchema],
  done: [itemSchema]
}, {collection: 'employees'})

//export mongoose schema
module.exports = mongoose.model('Employee', employeeSchema);
