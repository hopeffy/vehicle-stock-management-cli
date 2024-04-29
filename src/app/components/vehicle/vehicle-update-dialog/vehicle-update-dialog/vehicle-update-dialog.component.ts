import { Component, Inject, OnInit } from '@angular/core';
import { VehicleService } from '../../../../services/vehicle.service';
import { Vehicle } from '../../../../interfaces/vehicle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-vehicle-update-dialog',
  templateUrl: './vehicle-update-dialog.component.html',
  styleUrl: './vehicle-update-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class VehicleUpdateDialogComponent implements OnInit {
  FileLabel: string[] = [];
  working = false;
  uploadFileLabel: string | undefined;
  photo : File | undefined;
  addVehicleForm : FormGroup | undefined;

  currentDate = new Date();
  vehicle : Partial<Vehicle> = {
    id: this.data.id,
    plaka: this.data.plaka,
    modelYear: this.data.modelYear,
    inspectionDate: this.data.inspectionDate,
    path: this.data.path
  };
  baseUrl = `${environment.baseUrl}/api/Vehicle`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleService : VehicleService, 
    private ref : MatDialogRef<VehicleUpdateDialogComponent>,
    private dialog : MatDialog,
    private http : HttpClient,
    private formBuilder : FormBuilder
  ){
    
  }

  inputdata :  Partial<Vehicle> = {
    id: '',
    plaka: '',
    modelYear: 0,
    inspectionDate: this.currentDate,
    path: '',
    isActive: true
  };


  
  ngOnInit(): void {

    this.inputdata.id = this.data.id;
    this.inputdata.plaka = this.data.plaka;
    this.inputdata.modelYear = this.data.modelYear;
    this.inputdata.inspectionDate = this.data.inspectionDate;
    this.inputdata.path =  this.data.path;

    this.addVehicleForm = this.formBuilder.group({
      id : '',
      plaka : '',
      modelYear : 0,
      inspectionDate : Date,
      path : '',
      isActive : true
    })

  }


  closePopUp() {
    this.ref.close();
    
  }

  setPopUpData() {
    this.vehicleService.updateVehicle(this.inputdata).subscribe((res) => {
         console.log(res);

    })
    this.closePopUp();

  }

  handleFileInput(event:any) {
    debugger
    var file = event.target.files[0];
    var vehicle : Vehicle = this.addVehicleForm?.value as Vehicle;
    
    
    const formData : FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('vehicle',JSON.stringify(vehicle));

    this.http.post(`${this.baseUrl}\\UploadImage`, formData).subscribe((res)=> {
      console.log(res);
      
    });

  }
  

}
