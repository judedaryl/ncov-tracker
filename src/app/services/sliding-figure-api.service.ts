import { Injectable } from '@angular/core';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SlidingFigure } from '../arcgis/sliding-figure';
import { QueryBuilder } from '../arcgis/query-params';
import { FeatureServers } from '../constants/arcgis-ph.features';

@Injectable({
  providedIn: 'root'
})
export class SlidingFigureApiService {

  constructor(private arcgis: ArcgisService) { }

  getStatistics(): Observable<SlidingFigure> {
    const queryParams = new QueryBuilder<SlidingFigure>().build();
    return this.arcgis.queryArcgis<SlidingFigure>(FeatureServers.slidingFigure, queryParams)
      .pipe(
        map(q => q[0])
      )
  }
}
