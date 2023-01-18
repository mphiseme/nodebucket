/**
 Title Login.component.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description login component for NodeBucket app
 */

 // imported statements
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from '../../shared/services/employee.service';
import { Employee } from 'src/app/shared/models/employee.interface';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Assign an empty prime array to errorMessages variable
  errorMessages: Message[] = [];
  employee: Employee; //assigned the employee interface to variable employee

     // validate the loginForm to make sure only numerical values are are entered.
    loginForm: FormGroup = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  })




  constructor(private fb: FormBuilder, private router: Router, private cookieServices: CookieService,
    private http: HttpClient, private employeeService: EmployeeService) {
      this.employee = {} as Employee;
     }

  ngOnInit(): void {
  }

     // Established cookie session to keeps the employee logged in for 1 day if they logged
     //if they signed in correctly
     login() {
    const empId = this.loginForm.controls['empId'].value;
    this.employeeService.findEmployeeById(empId).subscribe({

      next: (res) => {
        if (res) {
          this.employee = res;
          this.cookieServices.set('session_user', this.employee.empId.toString(), 1);
          this.cookieServices.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate(['/'])
        }else {
         // Error message is the wrong invalid employeeId is entered.
          this.errorMessages = [
            {severity: 'error', summary: 'Error', detail: 'Please enter a valid employeeId to continue'}
          ]
        }
      },
      error: (e) => {
        console.log(e);
        this.errorMessages = [
          {severity: 'error', summary: 'Error', detail: e.message}
        ]

      }

    })
  }




}
