import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private apiService: ApiService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Auth guard');
    return this.apiService.isAuthenticated().pipe(map(data => {
      const d: any = data;
      if (d.status === true && d.isAuthValid) {
        console.log('Auth success');
        return true;
      } else {
        console.log(data);
        console.log('auth failed');
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }

}
