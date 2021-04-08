import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {
    console.log(`adding authorization header: ${localStorage.getItem('auth_token')}`);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`adding authorization header: ${localStorage.getItem('auth_token')}`);
    return next.handle(
      req.clone({
        headers: req.headers.append('Authorization', localStorage.getItem('auth_token'))
      })
    );
  }
}
