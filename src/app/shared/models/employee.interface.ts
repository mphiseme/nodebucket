/**
 Title: employee.interface.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description: interface for data
*/
import {Item} from "./item.interface";

export interface Employee {
  empId: number;
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];
}
