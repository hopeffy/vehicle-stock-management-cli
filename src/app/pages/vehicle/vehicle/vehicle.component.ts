import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../../../interfaces/vehicle';
import { VehicleService } from '../../../services/vehicle.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehicleCreateDialogComponent } from '../../../components/vehicle/vehicle-create-dialog/vehicle-create-dialog/vehicle-create-dialog.component';
import { VehicleUpdateDialogComponent } from '../../../components/vehicle/vehicle-update-dialog/vehicle-update-dialog/vehicle-update-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class VehicleComponent implements OnInit {
  displayedColumns: string[] = ['plaka', 'modelYear', 'inspectionDate', 'action'];
  vehicles: Vehicle[] = [];
  dataSource!: MatTableDataSource<Vehicle>;


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentDate = new Date();
  vehicle: Vehicle = {
    id: '',
    plaka: '',
    modelYear: 0,
    inspectionDate: this.currentDate,
    path: '',
    isActive: true
  }


  constructor(
    private createDialog: MatDialog,
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<VehicleCreateDialogComponent>,
    private updateDialog: MatDialog
  ) {
    this.loadVehicles();
    
  }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getAllVehicles().subscribe((res) => {
      this.vehicles = res;
      this.dataSource = new MatTableDataSource<Vehicle>(this.vehicles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  openDialog() {
    const dialog = this.createDialog.open(VehicleCreateDialogComponent);
    dialog.afterClosed().subscribe((response) => {
      this.loadVehicles();
      window.location.reload();
    })
    
  }

  openPopUp(element:Vehicle) {
    var _dialog = this.updateDialog.open(VehicleUpdateDialogComponent, {
      data : element
    });
    _dialog.afterClosed().subscribe(item => {
      this.loadVehicles();
      
    })
  }

  editVehicle(element: Vehicle) {
      this.openPopUp(element);
  }

  deleteVehicle(id : string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your vehicle has been deleted.",
          icon: "success"
        });
        this.vehicleService.deleteVehicle(id).subscribe((res)=> {
        
        })
      }
    });

  }
}
