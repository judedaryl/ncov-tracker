import { Injectable } from '@angular/core';
import { InventoryStatistic } from '../interfaces/inventory-statistic';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getInventoryStatistic } from '../mappers/arcgis-statistic.mapper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  constructor(private http: HttpClient) { }

  getInventoryStatistics(): Observable<InventoryStatistic[]> {
    var params = {
      f: 'json',
      where: '1=1',
      returnGeometry: 'false',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      orderByFields: 'regnum asc',
      cacheHint: 'true',
      groupByFieldsForStatistics: ''
    }

    return this.http.get(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/commodities/FeatureServer/0/query`, {
      params: params
    }).pipe(map(getInventoryStatistic));
  }
}
