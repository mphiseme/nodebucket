/**
 Title employee-api.js
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description: Nodebucket project
 */

const express = require('express');
const Employee =require('../models/employee');

const router =express.Router();

/**
 * findEmployeeId
 */

router.get('/:empId', async(req, res)=>{
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, emp){
      if(err)
      {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB server error: '+ err.message
        })

      }else
      {
        console.log(emp);
        res.json(emp); //returns the data as Json
        }
    })
  }
  /**
   * Look for potential server errors
   */

  catch(e){
    console.log(e);
    res.status(500).send({
      'err': 'internal server error!'
    })
  }
})
module.exports = router;
