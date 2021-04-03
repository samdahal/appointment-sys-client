import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {rS} from '@angular/core/src/render3';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

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
        this.router.navigate(['/']);
      }

    });
  }
}
