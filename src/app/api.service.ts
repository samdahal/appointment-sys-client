import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: localStorage.getItem('auth_token')
    })
  };

  doLogin(data) {
    return this.http.post(`${environment.authUrl}`, data);
  }

  isAuthenticated() {

    return this.http.get(`${environment.myApiUrl}/user/isAuthenticated`, this.httpOptions);
  }

  getCurrentUser() {
    return this.http.get(`${environment.myApiUrl}/user/getCurrentUser`, this.httpOptions);
  }

  getMyAppointments() {
    return this.http.get(`${environment.myApiUrl}/appointment/mine`, this.httpOptions);
  }

  createAppointment(appointment) {
    return this.http.post(`${environment.myApiUrl}/appointment/create`, appointment, this.httpOptions);
  }

  getAppointmentById(appointmentId) {
    return this.http.get(`${environment.myApiUrl}/appointment/${appointmentId}`, this.httpOptions);
  }

  cancelAppointment(appointmentId: number) {
    return this.http.get(`${environment.myApiUrl}/appointment/cancel/${appointmentId}`, this.httpOptions);
  }

  updateAppointment(appointment) {
    return this.http.put(`${environment.myApiUrl}/appointment/update`, appointment, this.httpOptions);
  }

  createUser(user) {
    return this.http.post(`${environment.signupUrl}`, user);
  }
}
