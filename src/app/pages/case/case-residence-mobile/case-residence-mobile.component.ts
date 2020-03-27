import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { MapComponent } from 'src/app/shared/map/map.component';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-case-residence-mobile',
  templateUrl: './case-residence-mobile.component.html',
  styleUrls: ['./case-residence-mobile.component.scss']
})
export class CaseResidenceMobileComponent implements OnInit, OnDestroy {

  selectedCase$ = new BehaviorSubject<PHCase>(null);
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
        return this.phMaster.searchMasterlist('residence', search)
      })
    )

    this.header$ = this.activatedRoute.params.pipe(
      map(({ search }) => search)
    )

    this.mapDataSubscription = combineLatest(this.cases$.pipe(take(1)), this.selectedCase$).pipe(
      map(([cases, selected]) => selected || cases[0])
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
