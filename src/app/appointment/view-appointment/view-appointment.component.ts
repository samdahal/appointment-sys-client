import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  appointmentId = 0;
  retrievedAppointment = {};

  constructor(private apiService: ApiService, private router: Router, private routeParams: ActivatedRoute) {
   this.appointmentId = routeParams.snapshot.params.id;
  }

  ngOnInit() {
    this.apiService.getAppointmentById(this.appointmentId).subscribe(data => {
      this.retrievedAppointment = data;
      console.log(this.retrievedAppointment);
    });
  }

  cancelAppointment() {
    const confirmDialog = confirm('Are you sure you want to cancel this appointment?');
    if (confirmDialog) {
      this.apiService.cancelAppointment(this.appointmentId).subscribe(data => {
        this.retrievedAppointment = data;
      });
    }
  }

  editAppointment() {
    this.router.navigate(['/appointment/edit/', this.appointmentId]);
  }
}
