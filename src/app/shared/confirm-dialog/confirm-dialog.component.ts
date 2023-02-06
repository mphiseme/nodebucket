/**
 Title confirm-dialog.component.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date feb 5, 2023
 Description code related to the dialog box
 */

import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData} from '../models/dialog-data.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dialogData: DialogData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData =data;
    console.log(this.dialogData);
  }

  ngOnInit(): void {
  }

}
