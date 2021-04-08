import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  appointments: any = {};

  ngOnInit() {
    this.apiService.getMyAppointments().subscribe(data => {
      this.appointments = data;
    });
  }

}
