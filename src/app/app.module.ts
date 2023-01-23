/**
 Title app.modules.ts
 Author: Professor Krasso
 Modified By: Manel Phiseme
 Date Jan 15, 2023
 Description holds the imported dependencies for NodeBucket app
 */


 // The Dependencies for the application
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactComponent } from './pages/contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    LoginComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
