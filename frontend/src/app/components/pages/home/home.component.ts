import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherData: undefined;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      let {latitude, longitude} = position.coords;
      let lang = "es";

      let body = {
        "latitude": latitude,
        "longitude": longitude,
        "lang": lang
      }

      this.weatherService.getWeather(body).subscribe((data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        
      }, (err) => {
        console.log = err.error;
      });
    });
  }

}
