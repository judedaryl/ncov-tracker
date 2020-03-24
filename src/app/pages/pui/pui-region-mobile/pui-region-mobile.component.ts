import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';
import { MapComponent } from 'src/app/shared/map/map.component';
import { ActivatedRoute } from '@angular/router';
import { PuiApiService } from 'src/app/services/pui-api.service';
import { mergeMap, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-pui-region-mobile',
  templateUrl: './pui-region-mobile.component.html',
  styleUrls: ['./pui-region-mobile.component.scss']
})
export class PuiRegionMobileComponent implements OnInit, OnDestroy {

  header$: Observable<string>;
  mapDataSubscription: Subscription;
  puis$: Observable<PuiTracing[]>;
  puiSelected$ = new BehaviorSubject<PuiTracing>(null);

  @ViewChild(MapComponent, { static: false }) map: MapComponent;


  constructor(
    private activatedRoute: ActivatedRoute,
    private puiTracingService: PuiApiService) {
  }


  ngOnInit() {

    this.puis$ = this.activatedRoute.params.pipe(
      mergeMap(({ search }) => {
        search = search && search.split(`'`).join(`''`);
        return this.puiTracingService.search('region', search)
      })
    )

    this.header$ = this.activatedRoute.params.pipe(
      map(({ search }) => search)
    )

    this.mapDataSubscription = combineLatest(this.puis$.pipe(take(1)), this.puiSelected$).pipe(
      map(([puis, selected]) => selected || puis[0])
    )
      .subscribe(({ latitude, longitude }) => {
        this.map && this.map.setCenter(latitude, longitude);
      });
  }

  ngOnDestroy(): void {
    this.mapDataSubscription.unsubscribe();
  }

}