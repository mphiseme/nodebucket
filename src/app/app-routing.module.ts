/**
 Title: app-routing.module.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description: Routing for Nodebucket project
*/

//Imported statements
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseLayoutComponent} from "./shared/base-layout/base-layout.component";
import {HomeComponent} from "./pages/home/home.component";
import { AuthGuard } from './auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

//Auth and base layout Routes
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
