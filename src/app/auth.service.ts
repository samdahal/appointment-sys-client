import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  userLoggedIn = new Subject<boolean>();
  userLoggedOut = new Subject<boolean>();

}
