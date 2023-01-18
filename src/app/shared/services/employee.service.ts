/**
 Title: employee.service.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description: Employee service for Nodebucket application
*/
//import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  //Using the employee id entered, the user api is returned
  findEmployeeById(empId: number): Observable<any>{
    return this.http.get('/api/employees/' + empId)
  }
}
