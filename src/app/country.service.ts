import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

export interface Country {
  alpha2Code: string;
  name: string;
}

export const COUNTRIES: string = "countries";

@Injectable()
export class CountryService {
  static URL = "https://restcountries.com/v2/all";

  constructor(private http: HttpClient) {}

  countryList$(): Observable<Country[]> {
    const countries = JSON.parse(localStorage.getItem(COUNTRIES)) as Country[];
    if (countries) {
      return of(countries);
    }
    return this.http.get<Country[]>(CountryService.URL).pipe(
      tap((res) => {
        localStorage.setItem(COUNTRIES, JSON.stringify(res));
      })
    );
  }
}
