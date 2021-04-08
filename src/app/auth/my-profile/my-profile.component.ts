import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  user = {};

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe(data => {
      this.user = data;
    });
  }

}
