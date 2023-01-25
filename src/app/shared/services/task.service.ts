/**
 Title auth-layout.component.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 25, 2023
 Description login component for NodeBucket app
 */

//imported statements
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  //function to find all the task of an employee
  findAllTasks(empId: number,): Observable<any>{
    return this.http.get('/api/employees/' + empId + '/tasks');
  }


  //function add task to employee
  createTask(empId: number, task: string): Observable<any>{
    return this.http.post('api/employees/' + empId + '/tasks', {
      text: task
    })
  }
}
