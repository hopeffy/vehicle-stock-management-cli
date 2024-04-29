import { Component } from '@angular/core';
import { Vehicle } from '../../../../interfaces/vehicle';
import { VehicleService } from '../../../../services/vehicle.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-vehicle-create-dialog',
  templateUrl: './vehicle-create-dialog.component.html',
  styleUrl: './vehicle-create-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class VehicleCreateDialogComponent {
  currentDate = new Date();
  date = new FormControl(new Date());

  vehicle : Vehicle = {
    id: '',
    plaka: '',
    modelYear: 0,
    inspectionDate: this.date.value!,
    path: '',
    isActive: true
  }

  FileLabel: string[] = [];
  // images: any[] = [];
  working = false;
  uploadFileLabel: string | undefined;

  regex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/;
  formControl = new FormControl('', Validators.pattern(this.regex));
  
  baseUrl = `${environment.baseUrl}/api/Vehicle`;
  constructor(
    private vehicleService : VehicleService,
    private ref : MatDialogRef<VehicleCreateDialogComponent>,
    private http : HttpClient
  ){

  }
  // events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    debugger
    // this.events.push(`${type}: ${event.value}`);
    this.vehicle.inspectionDate = event.value!;
  }

ControlPlaka() {
return this.formControl.hasError('') ? 'Geçerli bir plaka girin' : '';
}

  createVehicle(){
      debugger
      this.vehicleService.createVehicle(this.vehicle).subscribe({
        next: (response) => {
          // console.log(response);
          
        },
        error : (error) => {
  
        }
      })
      this.ref.close();
    
    
  }

  handleFileInput(event:any) {
    debugger
    
    var file = event.target.files[0];
    const formData : FormData = new FormData();
    formData.append('file', file, file.name);
    

    this.http.post(`${this.baseUrl}\\UploadImage`, formData).subscribe((res)=> {
      console.log(res);
      
    });

  }
}
