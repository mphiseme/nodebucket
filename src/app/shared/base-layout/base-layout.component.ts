/**
 Title Login.component.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description login component for NodeBucket app
 */
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  //hold the variables for imports
  constructor(private cookieService: CookieService, private router: Router) {

   }

  ngOnInit(): void {
  }

  logout(){
    this.cookieService.deleteAll(),
    this.router.navigate(['/session/login']);
  }
}
