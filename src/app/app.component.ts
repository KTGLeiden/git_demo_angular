import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Car } from './shared/models/car.model';
import { CarService } from './shared/services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'demo';
  public cars: Car[];
  public errorMessage: string;
  constructor(private readonly carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  private onError = (error: HttpErrorResponse) => (this.errorMessage = 'Something went wrong');

  public getCars() {
    const allCars$ = this.carService.getAllCars();
    allCars$.subscribe(cars => {
      this.cars = cars;
    }, this.onError);
  }

  public addCar() {
    // Create car
    const car: Car = {
      brand: 'Kia',
      color: 'red',
      id: 6,
      name: 'Rio',
      releaseYear: 2005
    };

    // ADd to "database"
    this.carService.addCar(car).subscribe(() => {}, this.onError);
  }

  /** Deletes car */
  public deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(() => {}, this.onError);
  }
  /** Deletes car */
  public updateCar(id: number) {
    const car: Car = {
      id,
      brand: 'new',
      color: 'new color',
      name: 'vehicle',
      releaseYear: new Date().getFullYear()
    };
    this.carService.updateCar(car).subscribe(() => {}, this.onError);
  }
}
