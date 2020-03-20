import { Injectable } from '@angular/core';
import { AgeGroupStatistic } from '../interfaces/age-group-statistic';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getAgeGroupStatistic } from '../mappers/arcgis-statistic.mapper';
import { map } from 'rxjs/operators';
import { ArcgisResponse, AgeGroupResponse } from '../interfaces/arcgis';

@Injectable({
  providedIn: 'root'
})
export class AgeGroupApiService {

  constructor(private http: HttpClient) { }

  getAgeGroupStatistics(): Observable<AgeGroupStatistic[]> {
    var params = {
      f: 'json',
      where: '1=1',
      returnGeometry: 'false',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      orderByFields: 'age_categ asc',
      cacheHint: 'true',
      groupByFieldsForStatistics: 'age_categ,sex',
      outStatistics: '[{"statisticType":"count","onStatisticField":"FID","outStatisticFieldName":"value"}]'
    }

    return this.http.get<ArcgisResponse<AgeGroupResponse>>(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/age_group/FeatureServer/0/query`, {
      params: params
    }).pipe(map(getAgeGroupStatistic));
  }
}
