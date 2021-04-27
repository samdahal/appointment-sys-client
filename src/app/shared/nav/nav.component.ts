import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ApiService} from '../../api.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  isAuthenticated = false;
  currentUser: any = {};
  isAdmin = false;
  userLoggedInSub: Subscription;

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
