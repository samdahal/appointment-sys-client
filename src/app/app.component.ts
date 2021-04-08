import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appointment-sys-client';
  isAuthenticated = false;
  currentUser: any = {};
  isAdmin = false;

  constructor(private apiService: ApiService) {
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

  }
}
