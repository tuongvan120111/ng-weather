import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import { interval, Observable } from 'rxjs';
import {  map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
  private timer: Observable<number>;
  private readonly reloadTime = 30;

  constructor(private weatherService : WeatherService, private locationService : LocationService, private router : Router) {
  }
  
  ngOnInit(): void {
    
   this.timer = interval(1000).pipe(
    map(value => this.reloadTime - value),
    takeWhile(x => x >= 0)
    )
    this.timer.subscribe((value) => {
      console.log('value', value)
    })
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
