import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../interfaces/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl = `${environment.baseUrl}/api/Vehicle`;
  constructor(
    private http : HttpClient
  ) { }

  createVehicle(model : Partial<Vehicle>) : Observable<Vehicle> {

    return this.http.post<Vehicle>(`${this.baseUrl}`, model);
  }

  getAllVehicles() : Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(`${this.baseUrl}\\getActiveVehicles`);
  }
  
  getVehicleById(id : string) : Observable<Vehicle>{
    return this.http.post<Vehicle>(`${this.baseUrl}\\${id}`, id);
  }

  updateVehicle(model: Partial<Vehicle>) : Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}\\update`, model);
  }

  deleteVehicle(id : string) : Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}\\delete\\${id}`, id);
  }

  
}
