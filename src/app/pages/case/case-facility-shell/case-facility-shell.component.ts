import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, mergeMap, take } from 'rxjs/operators';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { Observable, combineLatest, BehaviorSubject, Subject, merge, Subscription } from 'rxjs';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { MapComponent } from 'src/app/shared/map/map.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-facility-shell',
  templateUrl: './case-facility-shell.component.html',
  styleUrls: ['./case-facility-shell.component.scss']
})
export class CaseFacilityShellComponent implements OnInit, OnDestroy {

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''))
  facilityData$: Observable<Aggregate<PHCase>[]>;
  cases$: Observable<PHCase[]>;
  caseSearch$ = new BehaviorSubject<string>(null);
  selectedFacility$: Observable<string>;
  mapDataSubscription: Subscription;
  isMobile$: Observable<boolean>;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;


  constructor(
    private phMaster: PhMasterlistApiService,
    private router: Router,
    private route: ActivatedRoute,
    breakpointObserver: BreakpointObserver
  ) {
    this.isMobile$ = breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).pipe(
      map(({ matches }) => matches)
    )
  }


  ngOnInit() {
    this.facilityData$ = combineLatest(this.phMaster.getFacilityStatistics(), this.filter$).pipe(
      map(([facilities, filterString]) => facilities.filter(({ facility }) =>
        facility.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )

    this.cases$ = combineLatest(this.facilityData$.pipe(take(1)), this.caseSearch$).pipe(
      mergeMap(values => {
        let facilityName = values[1] || (values[0][0] && values[0][0].facility);
        facilityName = facilityName.split(`'`).join(`''`);
        return this.phMaster.searchMasterlist('facility', facilityName);
      })
    )

    this.selectedFacility$ = this.cases$.pipe(
      map(cases => cases[0] && cases[0].facility || '')
    )

    this.mapDataSubscription = this.cases$.pipe(
      map(cases => cases[0])
    )
      .subscribe(phCase => {
        this.map && this.map.setCenter(phCase.latitude, phCase.longitude);
      });
  }

  ngOnDestroy() {
    this.mapDataSubscription.unsubscribe();
  }

  view(item: string) {
    this.router.navigate([item], {
      relativeTo: this.route
    })
  }

}