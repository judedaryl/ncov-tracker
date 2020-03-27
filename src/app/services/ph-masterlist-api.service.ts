import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aggregate } from '../arcgis/aggregate';
import { PHCase } from '../arcgis/ph-masterlist';
import { QueryBuilder } from '../arcgis/query-params';
import { FeatureServers } from '../constants/arcgis-ph.features';
import { ArcgisService } from './arcgis.service';

@Injectable({
  providedIn: 'root'
})
export class PhMasterlistApiService {

  constructor(private arcgis: ArcgisService) { }

  getAllCases(): Observable<PHCase[]> {
    const queryParams = new QueryBuilder<PHCase>()
      .setOrder('sequ', 'desc')
      .build();

    return this.arcgis.queryArcgis<PHCase>(
      FeatureServers.philippinesMaster,
      queryParams
    );
  }

  getFacilityStatistics(): Observable<Aggregate<PHCase>[]> {
    const queryParams = new QueryBuilder<PHCase>()
      .setOrder('value', 'desc')
      .setOrder('facility', 'asc')
      .setGrouping('facility')
      .setStatistic('count', 'FID')
      .build();

    return this.arcgis.queryArcgis<Aggregate<PHCase>>(
      FeatureServers.philippinesMaster,
      queryParams
    );
  }

  getResidenceStatistics(): Observable<Aggregate<PHCase>[]> {
    const queryParams = new QueryBuilder<PHCase>()
      .setOrder('value', 'desc')
      .setOrder('residence', 'asc')
      .setGrouping('residence')
      .setStatistic('count', 'FID')
      .build();

    return this.arcgis.queryArcgis<Aggregate<PHCase>>(
      FeatureServers.philippinesMaster,
      queryParams
    );
  }

  getNationalityStatistic(): Observable<Aggregate<PHCase>[]> {
    const queryParams = new QueryBuilder<PHCase>()
      .setOrder('value', 'desc')
      .setOrder('nationalit', 'asc')
      .setGrouping('nationalit')
      .setStatistic('count', 'FID')
      .build();

    return this.arcgis.queryArcgis<Aggregate<PHCase>>(
      FeatureServers.philippinesMaster,
      queryParams
    );
  }

  searchMasterlist(field: keyof PHCase, search: string): Observable<PHCase[]> {
    const queryParams = new QueryBuilder<PHCase>()
      .setOrder('sequ', 'desc')
      .setQuery(`${field}='${search}'`)
      .build();
    return this.arcgis.queryArcgis<PHCase>(
      FeatureServers.philippinesMaster,
      queryParams
    )
  }
}
