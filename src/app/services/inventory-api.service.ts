import { Injectable } from '@angular/core';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs';
import { Inventory } from '../arcgis/inventory';
import { QueryBuilder } from '../arcgis/query-params';
import { FeatureServers } from '../constants/arcgis-ph.features';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  constructor(private arcgis: ArcgisService) { }

  getInventoryStatistics(): Observable<Inventory[]> {
    const queryParams = new QueryBuilder<Inventory>()
      .setOrder('regnum', 'asc')
      .build();

    return this.arcgis.queryArcgis<Inventory>(FeatureServers.commodities, queryParams);
  }

  search(field: keyof Inventory, search: string): Observable<Inventory[]> {
    const queryParams = new QueryBuilder<Inventory>()
    .setOrder(field, 'desc')
    .setQuery(`${field}='${search}'`)
    .build();
    return this.arcgis.queryArcgis<Inventory>(
      FeatureServers.puiFacilityTracking,
      queryParams
    )
  }
}
