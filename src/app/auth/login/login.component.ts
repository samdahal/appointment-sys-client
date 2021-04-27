import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {rS} from '@angular/core/src/render3';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private userService: UserService) { }

  username: '';
  password: '';
  usernamePasswordInvalid = false;

  ngOnInit() {
  }

  doPerformLogin() {
    this.usernamePasswordInvalid = false;
    this.apiService.doLogin({username: this.username, password: this.password}).subscribe(result => {
      const r: any = result;
      if (r.status && r.status === 'error') {
        if (r.reason === 'username_password_invalid') {
          this.usernamePasswordInvalid = true;
        }
      }

      if (r.status && r.status === 'success') {
        localStorage.setItem('auth_token', r.token);
        localStorage.setItem('username', r.username);
        localStorage.setItem('userId', r.userId);
        localStorage.setItem('userRoles', JSON.stringify(r.roles));
        this.authService.userLoggedIn.next(true);
        this.userService.userInfoSetSubject.next({
          username: localStorage.getItem('username'),
          userId: parseInt(localStorage.getItem('userId')),
          userRoles: JSON.parse(localStorage.getItem('userRoles'))
        });
        this.router.navigate(['/']);
      }

    });
  }
}
