import { Injectable } from '@angular/core';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs';
import { Aggregate } from '../arcgis/aggregate';
import { PuiTracing } from '../arcgis/pui-tracing';
import { QueryBuilder } from '../arcgis/query-params';
import { FeatureServers } from '../constants/arcgis-ph.features';

@Injectable({
  providedIn: 'root'
})
export class PuiApiService {

  constructor(private arcgis: ArcgisService) { }


  getPuiRegionStatistic(): Observable<Aggregate<PuiTracing>[]> {

    const queryParams = new QueryBuilder<PuiTracing>()
      .setGrouping('region')
      .setStatistic('sum', 'PUIs')
      .setOrder('value', 'desc')
      .build();

    return this.arcgis.queryArcgis<Aggregate<PuiTracing>>(
      FeatureServers.puiFacilityTracking,
      queryParams
    );
  }

  getPuiHospitalFacilityStatistic(): Observable<Aggregate<PuiTracing>[]> {

    const queryParams = new QueryBuilder<PuiTracing>()
      .setGrouping('hf')
      .setStatistic('sum', 'PUIs')
      .setOrder('value', 'desc')
      .build();

    return this.arcgis.queryArcgis<Aggregate<PuiTracing>>(
      FeatureServers.puiFacilityTracking,
      queryParams
    );
  }

  search(field: keyof PuiTracing, search: string): Observable<PuiTracing[]> {
    const queryParams = new QueryBuilder<PuiTracing>()
    .setOrder(field, 'desc')
    .setQuery(`${field}='${search}'`)
    .build();
    return this.arcgis.queryArcgis<PuiTracing>(
      FeatureServers.puiFacilityTracking,
      queryParams
    )
  }
}
