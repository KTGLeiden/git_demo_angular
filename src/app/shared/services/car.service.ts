import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly endpoint = 'http://localhost:1234/cars';

  constructor(private readonly http: HttpClient) {}

  public getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.endpoint);
  }

  public deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
    return this.http.delete<void>(this.endpoint + '/' + id);
  }

  public addCar(car: Car): Observable<void> {
    return this.http.post<void>(this.endpoint, car);
  }

  public updateCar(car: Car): Observable<void> {
    return this.http.put<void>(`${this.endpoint}/${car.id}`, car);
  }
}
