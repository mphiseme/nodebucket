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

/**
 * Api to findAllTasks
 */

router.get('/:empId/tasks', async(req, res) =>{
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, emp){
      if (err){
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ':' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })

  } catch (e){
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ':' + e.message
    })
  }
})

/**
 * Api to createTask
 */

router.post('/:empId/tasks', async(req, res)=>{
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp){
      if(err){
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ':' + err.message
        })

      }else {
        console.log(emp);

        /**
         * If the response is not null
         */

        if (emp){

          const newTask = {
            text: req.body.text
          }

          emp.todo.push(newTask);

          emp.save(function(err, updatedEmp){
            if (err){
              console.log(err);
              res.status(501).send({
                'err': config.mongoServerError + ':' + err.message
              })
            } else {
              console.log(updatedEmp);
              res.json(updateEmp);
            }
          })

        }else {

          /**
           * If the response (a.k.a emp is null)
           */

          res.status(401).send({
           'err': 'EmployeeId:' + req.params.empId + 'does not belong to registered user'
          })

        }

      }
    })

  }catch (e){
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ':' + e.message
    })
  }
})

module.exports = router;
