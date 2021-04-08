import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  constructor(private apiService: ApiService, private routeParams: ActivatedRoute) { }
  appointment = {};
  appointmentId = 0;

  ngOnInit() {
    this.appointmentId = this.routeParams.snapshot.params.id;
    this.apiService.getAppointmentById(this.appointmentId).subscribe(data => {
      this.appointment = data;
    });
  }

  updateAppointment() {
    this.apiService.updateAppointment(this.appointment).subscribe(data => {
      this.appointment = data;
    });
  }
}
