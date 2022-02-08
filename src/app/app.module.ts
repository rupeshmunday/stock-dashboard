import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { CoreModule } from './core/core.module';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './login/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [  LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
