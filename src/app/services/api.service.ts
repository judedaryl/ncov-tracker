import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArcgisResponse, FacilityResponse, ResidenceResponse, OverviewResponse, NationalityResponse } from '../interfaces/arcgis';
import {  getFacilityStatistic, getResidenceStatistic, getOverviewFromResponse, getAggregatedNationalityStatistic } from '../mappers/arcgis-statistic.mapper';
import { OverviewStatistics } from '../interfaces/overview-statistics';
import { FacilityStatistics } from '../interfaces/facility-statistics';
import { ResidenceStatistics } from '../interfaces/residence-statistics';
import { AggregatedStatistic } from '../interfaces/aggregated-statistic';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<OverviewStatistics> {
    var params = new HttpParams()
    params = params.append('f', 'json')
    params = params.append('where', '1=1')
    params = params.append('returnGeometry', 'false')
    params = params.append('spatialRel', 'esriSpatialRelIntersects')
    params = params.append('outFields', '*')
    params = params.append('outStatistics', '');
    params = params.append('cacheHint', 'true')
    return this.http.get<ArcgisResponse<OverviewResponse>>(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/slide_fig/FeatureServer/0/query`, {
      params: params
    }).pipe(map(getOverviewFromResponse));
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

  getNationalityStatistic(): Observable<AggregatedStatistic[]> {
    var params = new HttpParams()
    params = params.append('f', 'json')
    params = params.append('where', '1=1')
    params = params.append('returnGeometry', 'false')
    params = params.append('spatialRel', 'esriSpatialRelIntersects')
    params = params.append('groupByFieldsForStatistics', 'nationalit')
    params = params.append('orderByFields', 'value desc')
    params = params.append('outFields', '*')
    params = params.append('outStatistics', '[{"statisticType":"count","onStatisticField":"FID","outStatisticFieldName":"value"}]')
    params = params.append('cacheHint', 'true')
    return this.http.get<ArcgisResponse<NationalityResponse>>(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query?`, {
      params: params
    }).pipe(map(getAggregatedNationalityStatistic));
  }
}
