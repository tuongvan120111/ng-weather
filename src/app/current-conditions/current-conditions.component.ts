import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";
import { interval, Observable, Subject, timer } from "rxjs";
import { map, takeUntil, takeWhile, tap } from "rxjs/operators";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {
  private reloadTime = 30000;
  private destroyed$ = new Subject();

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    timer(0, this.reloadTime)
      .pipe(
        tap(() => {
          this.refreshLocation();
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(zipcode: string, countryCode: string) {
    this.router.navigate(["/forecast", zipcode, countryCode]);
  }

  refreshLocation(): void {
    const locations = this.getCurrentConditions();
    locations.forEach((location) => {
      this.weatherService
        .getWeather(location.zipcode, location.countryCode)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          location.data = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  removeLocation(zipcode: string): void {
    this.locationService.removeLocation(zipcode);
  }
}
