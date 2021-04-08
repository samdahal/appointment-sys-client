import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  user = {username: '', lastName: '', firstName: '', password: ''};
  confirmPassword = '';
  hasUserCreationError = false;
  userCreationErrorMsg = '';
  userCreationSucceed = false;
  userCreationSucceedMessage = '';

  ngOnInit() {
  }

  doRegisterUser() {
    this.hasUserCreationError = false;
    this.userCreationSucceed = false;
    this.apiService.createUser(this.user).subscribe(data => {
      const d: any = data;
      if (d.status === 'error') {
        this.hasUserCreationError = true;
        if (d.reason === 'user_exists') {
          this.userCreationErrorMsg = 'User already exists with the user name: ' + this.user.username;
        }
      } else {
        this.userCreationSucceed = true;
        this.userCreationSucceedMessage = 'Registered successfully';
      }
    });
  }
}
