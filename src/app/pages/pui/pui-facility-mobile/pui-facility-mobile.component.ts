import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MapComponent } from 'src/app/shared/map/map.component';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { PuiApiService } from 'src/app/services/pui-api.service';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';

@Component({
  selector: 'app-pui-facility-mobile',
  templateUrl: './pui-facility-mobile.component.html',
  styleUrls: ['./pui-facility-mobile.component.scss']
})
export class PuiFacilityMobileComponent implements OnInit, OnDestroy {

  header$: Observable<string>;
  mapDataSubscription: Subscription;
  selected$: Observable<PuiTracing>;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;


  constructor(
    private activatedRoute: ActivatedRoute,
    private puiTracingService: PuiApiService) {
  }


  ngOnInit() {

    this.selected$ = this.activatedRoute.params.pipe(
      mergeMap(({ search }) => {
        search = search && search.split(`'`).join(`''`);
        return this.puiTracingService.search('hf', search)
      }),
      map(puis => puis[0])
    )

    this.header$ = this.activatedRoute.params.pipe(
      map(({ search }) => search)
    )

    this.mapDataSubscription = this.selected$
      .subscribe(({ latitude, longitude }) => {
        this.map && this.map.setCenter(latitude, longitude);
      });
  }

  ngOnDestroy(): void {
    this.mapDataSubscription.unsubscribe();
  }

}