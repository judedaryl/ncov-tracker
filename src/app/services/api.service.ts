import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { NcovStatistic } from '../interfaces/ncov-statistic';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getNcovStatistics(): Observable<NcovStatistic[]>  {
    // return of([{country:"Philippines",cases:193,todayCases:6,deaths:14,todayDeaths:50,recovered:4,active:175,critical:1}]);

    return this.http.get<NcovStatistic[]>('https://coronavirus-19-api.herokuapp.com/countries');
  }
}
