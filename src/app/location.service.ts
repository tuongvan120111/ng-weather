import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

export interface Location {
  zipcode: string;
  countryCode: string
}

@Injectable()
export class LocationService {
  locations: Location[] = [];

  constructor(private weatherService: WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc.zipcode, loc.countryCode).subscribe();
  }

  addLocation(zipcode: string, countryCode: string = "us"): Observable<any> {
    return this.weatherService.addCurrentConditions(zipcode, countryCode).pipe(
      tap(() => {
        this.locations.push({zipcode, countryCode});
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      })
    );
  }

  removeLocation(zipcode: string) {
    let index = this.locations.findIndex((e) => e.zipcode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
