import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, of, forkJoin } from 'rxjs';
import { StatisticType } from './types';
import { map } from 'rxjs/operators';
import { ArcgisResponse, FacilityResponse, ResidenceResponse } from '../interfaces/arcgis';
import { getValueFromStatisticResponse, getFacilityStatistic, getResidenceStatistic } from '../mappers/arcgis-statistic.mapper';
import { OverviewStatistics } from '../interfaces/overview-statistics';
import { DOHContent } from '../interfaces/doh';
import { getDateFromDOHContent } from '../mappers/doh-content.mapper';
import { FacilityStatistics } from '../interfaces/facility-statistics';
import { ResidenceStatistics } from '../interfaces/residence-statistics';

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
      this.getIndividualStatistic('tests'),
      this.getDataAsOf()
    ).pipe(
      map(valueResp => ({
        confirmed: valueResp[0],
        deaths: valueResp[1],
        recovered: valueResp[2],
        personsMonitored: valueResp[3],
        testConducted: valueResp[4],
        asOfDate: valueResp[5]
      }))
    )
  }

  getFacilityStatistics(): Observable<FacilityStatistics[]> {
    var params = new HttpParams()
    params = params.append('f', 'json')
    params = params.append('where', '1=1')
    params = params.append('returnGeometry', 'false')
    params = params.append('spatialRel', 'esriSpatialRelIntersects')
    params = params.append('orderByFields', 'FID desc')
    params = params.append('resultOffset', '0')
    params = params.append('outFields', '*')
    params = params.append('cacheHint', 'true')
    return this.http.get<ArcgisResponse<FacilityResponse>>(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?`, {
      params: params
    }).pipe(map(getFacilityStatistic));
  }

  getResidenceStatistics(): Observable<ResidenceStatistics[]> {
    var params = new HttpParams()
    params = params.append('f', 'json')
    params = params.append('where', '1=1')
    params = params.append('returnGeometry', 'false')
    params = params.append('spatialRel', 'esriSpatialRelIntersects')
    params = params.append('groupByFieldsForStatistics', 'residence')
    params = params.append('orderByFields', 'value desc')
    params = params.append('outFields', '*')
    params = params.append('outStatistics', '[{"statisticType":"count","onStatisticField":"FID","outStatisticFieldName":"value"}]')
    params = params.append('cacheHint', 'true')
    return this.http.get<ArcgisResponse<ResidenceResponse>>(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?`, {
      params: params
    }).pipe(map(getResidenceStatistic));
  }

  private getDataAsOf(): Observable<Date> {
    return this.http.get<DOHContent>("https://dohph.maps.arcgis.com/sharing/rest/content/items/3dda5e52a7244f12a4fb3d697e32fd39/data?f=json")
      .pipe(map(getDateFromDOHContent))
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
    return this.http.get(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/slide_fig/FeatureServer/0/query`, {
      params: params
    }).pipe(map(getValueFromStatisticResponse));
  }
}
