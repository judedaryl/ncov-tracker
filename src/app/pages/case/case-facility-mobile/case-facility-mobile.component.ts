import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'app-case-facility-mobile',
  templateUrl: './case-facility-mobile.component.html',
  styleUrls: ['./case-facility-mobile.component.scss']
})
export class CaseFacilityMobileComponent implements OnInit, OnDestroy {

  cases$: Observable<PHCase[]>;
  header$: Observable<string>;

  mapDataSubscription: Subscription;
  @ViewChild(MapComponent, { static: false }) map: MapComponent;


  constructor(
    private phMaster: PhMasterlistApiService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {

    this.cases$ = this.activatedRoute.params.pipe(
      mergeMap(({ search }) => {
        search = search && search.split(`'`).join(`''`);
        return this.phMaster.searchMasterlist('facility', search)
      })
    )

    this.header$ = this.activatedRoute.params.pipe(
      map(({ search }) => search)
    )

    this.mapDataSubscription = this.cases$.pipe(
      map(cases => cases[0])
    )
    .subscribe(phCase => {
      console.log(phCase)
        this.map && this.map.setCenter(phCase.latitude, phCase.longitude);
    });
  }

  ngOnDestroy(): void {
    this.mapDataSubscription.unsubscribe();
  }

}
