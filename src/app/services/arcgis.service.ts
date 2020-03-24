import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArcgisResponse } from '../arcgis/response';
import { QueryParams } from '../arcgis/query-params';

@Injectable({
  providedIn: 'root'
})
export class ArcgisService {

  constructor(private http: HttpClient) { }

  queryArcgis<TResponse>(featureServer: string, queryParams: QueryParams): Observable<TResponse[]> {
    const params: any = queryParams;
    return this.http.get<ArcgisResponse<TResponse>>(
      `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/${featureServer}/FeatureServer/0/query`,
      {
        params
      }).pipe(
        map(({ features }) =>
          features.map(({ attributes }) =>
            attributes
          )
        )
      );
  }
}
