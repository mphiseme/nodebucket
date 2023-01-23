/**
 Title auth.guard.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description holds the imported dependencies for NodeBucket app
 */

 //import elements
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})


//cookie service dependency is used to detect when user is logged in,
//stores the cookie in the users browser when logged in
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //get user id store in cookie id or session
      const sessionUser = this.cookieService.get('session_user');

      //check to see if there's user id/session stored in
      //user's browser cookies
      if (sessionUser){
        return true;
      }else {
        //if there's no user id/session exist in user's browser
        //They will be taken to logging page
        this.router.navigate(['/session/login']);
        return false;
      }
  }

}
