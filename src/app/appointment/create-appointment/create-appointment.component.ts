import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  user: any = {firstName: '', lastName: ''};
  appointment = {firstName: '', lastName: '', appointmentTime: '', visitReason: '', userId: -1};
  hasValidationError = false;
  validationErrors = [];
  showSucceedMessage = false;
  succeedMessage = '';

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe(data => {
      const d: any = data;
      this.appointment.firstName = d.firstName;
      this.appointment.lastName = d.lastName;
      this.appointment.userId = d.id;
    });
  }

  createAppointment() {
    console.log(this.appointment);
    const appointmentBackend = {
      start: this.appointment.appointmentTime,
      title: this.appointment.visitReason,
      user: {id: this.appointment.userId}
    };
    console.log(`Printing backendAppointment model`);
    console.log(appointmentBackend);
    this.apiService.createAppointment(appointmentBackend).subscribe(resp => {
      const r: any = resp;
      if (r.status === 'error') {
        this.hasValidationError = true;
        console.log('error occured');
        console.log(r.errors);
        this.validationErrors = r.errors;
      } else {
        this.showSucceedMessage = true;
        this.succeedMessage = `Appointment successfully created! <a [routerLink]="/view-my-appointments">Click to view it</a>`;
      }
    });
  }

  isCreateBtnDisabled() {
    return false;
  }
}
