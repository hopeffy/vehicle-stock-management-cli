import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './pages/vehicle/vehicle/vehicle.component';

const routes: Routes = [
  {
    path : '',
    component : VehicleComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
