import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'appointment-sys-client';
  isAuthenticated = false;
  currentUser: any = {};
  isAdmin = false;
  userLoggedInSub: Subscription;
  userInfoSetSub: Subscription;

  constructor(private apiService: ApiService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.apiService.isAuthenticated().subscribe(data => {
      const d: any = data;
      this.isAuthenticated = d.isAuthValid;
    });

    this.apiService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
      for (const r of this.currentUser.roles) {
        if (r.role === 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      }
    });

    this.userLoggedInSub = this.authService.userLoggedIn.subscribe(didUserLoggedIn => {
      this.isAuthenticated = didUserLoggedIn;
    });

    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.userInfoSetSub = this.userService.userInfoSetSubject.subscribe(userinfo => {
      this.currentUser = this.currentUser || {};
      this.currentUser.username = userinfo.username;
      this.currentUser.userId = userinfo.userId;
      this.currentUser.roles = userinfo.userRoles;
    });
  }

  private deInitSubscriptions(): void {
    this.userLoggedInSub.unsubscribe();
    this.userInfoSetSub.unsubscribe();
  }

  ngOnDestroy() {
    this.deInitSubscriptions();
  }

}
