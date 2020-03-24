import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArcgisService } from './arcgis.service';
import { Confirmed } from '../arcgis/confirmed';
import { QueryBuilder } from '../arcgis/query-params';
import { FeatureServers } from '../constants/arcgis-ph.features';

@Injectable({
  providedIn: 'root'
})
export class ConfirmedApiService {

  constructor(private arcgis: ArcgisService) { }

  getConfirmedStatistics(): Observable<Confirmed[]> {

    const queryParams = new QueryBuilder<Confirmed>()
      .setOrder('date', 'asc')
      .setGrouping('date')
      .build();

    return this.arcgis.queryArcgis<Confirmed>(FeatureServers.confirmed, queryParams);
  }
}
