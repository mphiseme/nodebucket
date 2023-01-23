/**
 Title item.js
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 17, 2023
 */

 //import statement
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String }
})

module.exports = itemSchema;
