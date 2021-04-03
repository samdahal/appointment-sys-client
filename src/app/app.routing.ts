import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {ViewallComponent} from './appointment/viewall/viewall.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'appointment-view-all', component: ViewallComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
