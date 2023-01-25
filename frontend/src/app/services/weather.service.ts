import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWeather(body:object): Observable<any> {
    return this.http.post<any>(this.api + 'weather', body);
  }
}
