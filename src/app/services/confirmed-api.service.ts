import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CaseStatistic } from '../interfaces/case-statistic';
import { getConfirmedStatistic } from '../mappers/arcgis-statistic.mapper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmedApiService {

  constructor(private http: HttpClient) { }

  getConfirmedStatistics(): Observable<CaseStatistic[]> {
    var params = {
      f: 'json',
      where: '1=1',
      returnGeometry: 'false',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      orderByFields: 'date asc',
      cacheHint: 'true',
      groupByFieldsForStatistics: 'date'
    }

    return this.http.get(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/confirmed/FeatureServer/0/query`, {
      params: params
    }).pipe(map(getConfirmedStatistic));
  }
}
