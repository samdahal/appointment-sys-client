import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ViewallComponent } from './appointment/viewall/viewall.component';
import { CreateAppointmentComponent } from './appointment/create-appointment/create-appointment.component';
import { ViewAppointmentComponent } from './appointment/view-appointment/view-appointment.component';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { EditAppointmentComponent } from './appointment/edit-appointment/edit-appointment.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavComponent } from './shared/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewallComponent,
    CreateAppointmentComponent,
    ViewAppointmentComponent,
    MyProfileComponent,
    EditAppointmentComponent,
    RegisterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
