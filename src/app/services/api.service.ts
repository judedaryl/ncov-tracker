import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, of, forkJoin } from 'rxjs';
import { StatisticType } from './types';
import { map } from 'rxjs/operators';
import { ArcgisResponse, ValueResponse } from '../interfaces/arcgis';
import { getValueFromStatisticResponse } from '../mappers/arcgis-statistic.mapper';
import { OverviewStatistics } from '../interfaces/overview-statistics';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<OverviewStatistics> {
    return forkJoin(
      this.getIndividualStatistic('confirmed'),
      this.getIndividualStatistic('deaths'),
      this.getIndividualStatistic('recovered'),
      this.getIndividualStatistic('pums'),
      this.getIndividualStatistic('tests')
    ).pipe(
      map(valueResp => ({
        confirmed: valueResp[0],
        deaths: valueResp[1],
        recovered: valueResp[2],
        personsMonitored: valueResp[3],
        testConducted: valueResp[4]
      }))
    )
  }


  private getIndividualStatistic(statisticType: StatisticType): Observable<number> {
    var params = new HttpParams()
    params = params.append('f', 'json')
    params = params.append('where', '1=1')
    params = params.append('returnGeometry', 'false')
    params = params.append('spatialRel', 'esriSpatialRelIntersects')
    params = params.append('outFields', '*')
    params = params.append('outStatistics', `[{"statisticType":"sum","onStatisticField":"${statisticType}","outStatisticFieldName":"value"}]`);
    params = params.append('cacheHint', 'true')
    console.log(params)
    return this.http.get(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/slide_fig/FeatureServer/0/query`, {
      params: params
    }).pipe(map(getValueFromStatisticResponse));
  }
}
