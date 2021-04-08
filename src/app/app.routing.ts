import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {ViewallComponent} from './appointment/viewall/viewall.component';
import {AuthGuard} from './auth.guard';
import {CreateAppointmentComponent} from './appointment/create-appointment/create-appointment.component';
import {ViewAppointmentComponent} from './appointment/view-appointment/view-appointment.component';
import {MyProfileComponent} from './auth/my-profile/my-profile.component';
import {EditAppointmentComponent} from './appointment/edit-appointment/edit-appointment.component';
import {RegisterComponent} from './auth/register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'create-appointment', component: CreateAppointmentComponent, canActivate: [AuthGuard]},
  {path: 'appointment/edit/:id', component: EditAppointmentComponent, canActivate: [AuthGuard]},
  {path: 'appointment/:id', component: ViewAppointmentComponent, canActivate: [AuthGuard]},
  {path: 'view-my-appointments', component: ViewallComponent, canActivate: [AuthGuard]},
  {path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
