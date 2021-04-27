import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {Subscription} from 'rxjs';
import {AuthService} from './auth.service';

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

  constructor(private apiService: ApiService, private authService: AuthService) {
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

  }

  ngOnDestroy() {
    this.userLoggedInSub.unsubscribe();
  }

}
