import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  
  latitude?: number;
  longitude?: number;
  lang: string = "en";
  unit: string = "c";
  
  weatherData: any;
  prox12hrs: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.loadLangAndUnit();//se obtienen el lenguaje y las unidades preseleccionadas
    this.getWeather();//se obtiene el pronostico del clima
  }

  loadLangAndUnit(): void{
    let l = localStorage.getItem("lang");
    let u = localStorage.getItem("unit");
    if(l=="es" || l=="en"){this.lang = l;}
    if(u=="c" || u=="f"){this.unit = u;}
  }

  getLocation(): Promise<void>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
  
        this.latitude = latitude;
        this.longitude = longitude;

        resolve();
      });
    });
  }

  getWeather(): void{
    this.loading = true;
    
    if(this.latitude && this.longitude){
      let body = {
        "latitude": this.latitude,
        "longitude": this.longitude,
        "lang": this.lang
      }
  
      this.weatherService.getWeather(body).subscribe((data) => {
        this.weatherData = data;
        this.getProx12Hours(this.weatherData);
        
        this.loading = false;
      }, (err) => {
        console.log = err.error;
      });
    } else {
      this.getLocation().then(() =>
        this.getWeather()
      );
    }
  }

  getProx12Hours(weatherData:any): void{
    let currentHour = Number(weatherData.location.localtime
      .split(" ")[1]
      .split(":")[0]);

    this.prox12hrs = new Array( weatherData.forecast.forecastday[0].hour[currentHour - 1]);

    for(let i = currentHour; i < currentHour + 11; i++){
      let hour = weatherData.forecast.forecastday[0].hour[i] 
      ? weatherData.forecast.forecastday[0].hour[i]
      : weatherData.forecast.forecastday[1].hour[i-24];
      
      this.prox12hrs.push(hour);
    }
  }

  changeUnits(newUnit:string): void{
    if(newUnit == "c" || newUnit == "f") {
      localStorage.setItem("unit", newUnit);
      this.unit = newUnit;
    };
  }
}
