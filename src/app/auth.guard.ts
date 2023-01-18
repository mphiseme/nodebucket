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

      const sessionUser = this.cookieService.get('session_user');

      if (sessionUser){
        return true;
      }else {
        this.router.navigate(['/session/login']);
        return false;
      }
  }

}
