
import { Injectable } from '@angular/core';
import { InventoryStatistic } from '../interfaces/inventory-statistic';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getInventoryStatistic } from '../mappers/arcgis-statistic.mapper';
import { map } from 'rxjs/operators';
import { PuiTracingResponse, ArcgisResponse, PuiRegionResponse, PuiHospitalFacilityResponse } from '../interfaces/arcgis';
import { AggregatedStatistic } from '../interfaces/aggregated-statistic';

@Injectable({
  providedIn: 'root'
})
export class PuiApiService {

  constructor(private http: HttpClient) { }


  getPuiRegionStatistic(): Observable<AggregatedStatistic[]> {
    return this.getPuiTraceStatistic<PuiRegionResponse>('region').pipe(
      map(q => q.map(({ value, region }) => ({
        aggregateKey: region,
        value
      })))
    )
  }

  getPuiHospitalFacilityStatistic(): Observable<AggregatedStatistic[]> {
    return this.getPuiTraceStatistic<PuiHospitalFacilityResponse>('hf').pipe(
      map(q => q.map(({ value, hf }) => ({
        aggregateKey: hf,
        value
      })))
    )
  }

  getPuiTraceStatistic<TResponse>(groupBy: string): Observable<TResponse[]> {
    var params = {
      f: 'json',
      where: '1=1',
      returnGeometry: 'false',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      orderByFields: 'value desc',
      cacheHint: 'true',
      groupByFieldsForStatistics: groupBy,
      outStatistics: '[{"statisticType":"sum","onStatisticField":"PUIs","outStatisticFieldName":"value"}]'
    }

    return this.http.get<ArcgisResponse<TResponse>>(`https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PUI_fac_tracing/FeatureServer/0/query`, {
      params: params
    }).pipe(map(q =>
      q.features
        .map(q => q.attributes)));
  }
}
