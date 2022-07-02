import { Component } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  countryCode: string;
  forecast: any;

  constructor(private weatherService: WeatherService, route : ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.countryCode  = params['countryCode'];
      weatherService.getForecast(this.zipcode, this.countryCode)
        .subscribe(data => this.forecast = data);
    });
  }
}
