/**
 Title employee-api.js
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description: Nodebucket project
 */

const { request } = require('express');
const express = require('express');
//const { OperationCanceledException } = require('typescript');
//const employee = require('../models/employee');
const Employee =require('../models/employee');
//const { path } = require('../models/item');

const router =express.Router();

/**
* openapi: 3.0.0
* @openapi
* /api/employees/{empId}:
*    get:
*       summary: returns a employee object
*       description: API for returning a single employee object from MongoDB
*       operationId: findEmployeeByID
*       parameters:
*         - name: empId
*           description: The employee requested by the user
*           in: path
*           schema:
*             type: number
*           required: true
*       responses:
*         '200':
*           description: Composer document
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
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
 * findAllTasks
 * @openapi
 * /api/employees/{empID}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description: Api to (findAllTasks)
 *     summary: returns all task for one employee
 *     parameters:
 *       - in: path
 *         name: empID
 *         schema:
 *           type: number
 *           description: empId to search for
 *     responses:
 *       '200':
 *         description: Array of students
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
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

/**
 * createTask
 * @openapi
 * /api/employees/{empId}/tasks:
 *  post:
 *    tags:
 *      - Employees
 *    description: Creates new task
 *    summary: Creates new task
 *    parameters:
 *      - in: path
 *        name: empId
 *        schema:
 *          type: number
 *          description: empId to search for
 *    requestBody:
 *      description: task title
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - text
 *              - dueDate
 *            properties:
 *              text:
 *                type: string
 *              dueDate:
 *                type: string
 *                format: date
 *    responses:
 *      '200':
 *        description: Employee document
 *      '500':
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 *
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
          console.log(emp)

          emp.todo.push(newTask);

          emp.save(function(err, updatedEmp){
            if (err){
              console.log(err);
              res.status(501).send({
                'err': config.mongoServerError + ':' + err.message
              })
            } else {
              console.log("marker UpdatedEmp")
              console.log(updatedEmp);
              res.json(updatedEmp);
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
