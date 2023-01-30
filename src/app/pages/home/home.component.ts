/**
 Title Login.component.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 22, 2023
 Description login component for NodeBucket app
 */

  // imported statements
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../shared/models/employee.interface';
import {Item} from '../../shared/models/item.interface';
import {MatDialog} from '@angular/material/dialog';
import {DialogData} from '../../shared/models/dialog-data.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Declare variables and assignment them to
  //various interfaces
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;
  dialogData: DialogData;

  //This set the requirement for the task inputs
  taskForm: FormGroup = this.fb.group({
    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])]
  })

  constructor(private taskService: TaskService, private cookieService: CookieService, private fb: FormBuilder,
    private dialog: MatDialog) {

    this.employee = {} as Employee;
    this.dialogData = {} as DialogData;


    this.todo = [];
    this.done = [];


    //this assign user id saved in browser cookie to empId
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    //this code use id stored in empID
    //to find an employee and it's todo and done tasks
    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res:any)=> {
        this.employee =res;

        console.log('Response from the findAllTasks service call')
        console.log(this.employee)
      },
      error: (e:any) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo=this.employee.todo;
        this.done = this.employee.done;

        console.log('onComplete() method from the home.component.ts file, findAllTasks() service call.')
        console.log(this.todo);
        console.log(this.done);
      }
    })
   }

  ngOnInit(): void {
  }

  //this using the employee id and taskform requirments
  //to create new tasks
  createTask(){
    const newTask = this.taskForm.controls['task'].value;

    this.taskService.createTask(this.empId, newTask).subscribe({
      next: (res:any) => {
        this.employee = res;


        console.log('--This is the response from the createTask service call.')
        console.log(res);
      },
      error: (e:any) =>{
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;

         console.log('--onComplete method from the home.component.ts file, createTask() service call--')
         console.log(this.todo);
         console.log(this.done);

         this.taskForm.controls['task'].setErrors({'incorrect': false});
      }
    })
  }

  deleteTask(taskId: string){

    this.dialogData.header = 'Delete Record Dialog';
    this.dialogData.content = 'Are you sure you want to delete this task?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.dialogData,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log(result)

        if(result === 'confirm'){
          this.taskService.deleteTask(this.empId, taskId).subscribe({
            next: (res) => {
              this.employee =res;
            },
            error:(e) => {
              console.log(e)
            },
            complete: () => {
              this.todo = this.employee.todo;
              this.done = this.employee.done;
            }
          })
        }
      }
    })
  }

  drop(event: CdkDragDrop<any[]>){
    if (event.previousContainer === event.container){

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Item reordered in the same column')

      this.updateTaskList(this.empId, this.todo, this.done);
    }else {

      console.log('Item moved to the other column')

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)

        this.updateTaskList(this.empId, this.todo, this.done);
    }
  }
  updateTaskList(empId: number, todo: Item[], done: Item[]){
    // write the code to call the update API
     //write the code the call the update API
     this.taskService.updateTask(empId, todo, done).subscribe({
       next: (res) => {
         this.employee =res;
       },
       error: (e) => {
         console.log(e);
       },
       complete: () => {
         this.todo = this.employee.todo;
         this.done = this.employee.done;
       }
     })

 }
}
