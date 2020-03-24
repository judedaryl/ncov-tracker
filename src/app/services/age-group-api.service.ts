import { Injectable } from '@angular/core';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs';
import { Aggregate } from '../arcgis/aggregate';
import { QueryBuilder } from '../arcgis/query-params';
import { AgeGroup } from '../arcgis/age-group';
import { FeatureServers } from '../constants/arcgis-ph.features';

@Injectable({
  providedIn: 'root'
})
export class AgeGroupApiService {

  constructor(private arcgis: ArcgisService) { }

  getAgeGroupStatistics(): Observable<Aggregate<AgeGroup>[]> {
    const queryParams = new QueryBuilder<AgeGroup>()
      .setOrder('age_categ', 'asc')
      .setGrouping('age_categ', 'sex')
      .setStatistic('count', 'FID')
      .build();
    return this.arcgis.queryArcgis<Aggregate<AgeGroup>>(
      FeatureServers.ageGroup,
      queryParams
    );
  }
}
