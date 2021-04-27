import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  userInfoSetSubject = new Subject<UserInfo>();

  getUserInfo(): UserInfo {
    return {
      username: localStorage.getItem('username'),
      userId: parseInt(localStorage.getItem('userId')),
      userRoles: JSON.parse(localStorage.getItem('userRoles'))
    };
  }


}

interface UserInfo {
  username: string;
  userId: number;
  userRoles: any;
}
