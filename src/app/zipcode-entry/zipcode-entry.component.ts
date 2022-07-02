import { Component, OnDestroy, OnInit } from "@angular/core";
import { Country, CountryService } from "app/country.service";
import { EMPTY, of, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LocationService } from "../location.service";

@Component({
  selector: "app-zipcode-entry",
  templateUrl: "./zipcode-entry.component.html",
})
export class ZipcodeEntryComponent implements OnInit, OnDestroy {
  zipcode = "";
  countryList: Country[] = [];

  private countryCode = "";
  private destroyed$ = new Subject();

  constructor(
    private service: LocationService,
    private countrSer: CountryService
  ) {}

  ngOnInit(): void {
    this.countrSer
      .countryList$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: Country[]) => {
        this.countryList = res;
      });
  }

  onChangeCountry(country: Country): void {
    this.countryCode = country?.alpha2Code || "";
  }

  addLocation$() {
    if (this.zipcode && this.countryCode) {
      return this.service.addLocation(this.zipcode, this.countryCode);
    }
    return EMPTY;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
