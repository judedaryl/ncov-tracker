import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, take, mergeMap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription, combineLatest, Subject } from 'rxjs';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { MapComponent } from 'src/app/shared/map/map.component';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-case-residence-shell',
  templateUrl: './case-residence-shell.component.html',
  styleUrls: ['./case-residence-shell.component.scss']
})
export class CaseResidenceShellComponent implements OnInit, OnDestroy {

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''))
  data$: Observable<Aggregate<PHCase>[]>;
  cases$: Observable<PHCase[]>;
  caseSearch$ = new BehaviorSubject<string>(null);
  selected$: Observable<string>;
  isMobile$: Observable<boolean>;
  mapDataSubscription: Subscription;
  caseSubscription: Subscription;
  caseSelected$ = new Subject<PHCase>();

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

    this.data$ = combineLatest(this.phMaster.getResidenceStatistics(), this.filter$).pipe(
      map(([data, filterString]) => data.filter(({ residence }) =>
        residence.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )

    this.cases$ = combineLatest(this.data$.pipe(take(1)), this.caseSearch$).pipe(
      mergeMap(values => {
        let toFilter = values[1] || (values[0][0] && values[0][0].residence);
        toFilter = toFilter.split(`'`).join(`''`);
        return this.phMaster.searchMasterlist('residence', toFilter);
      })
    )

    this.selected$ = this.cases$.pipe(
      map(cases => cases[0] && cases[0].residence || '')
    )

    this.caseSubscription = this.cases$.subscribe(cases => {
      this.caseSelected$.next(cases[0])
    })


    this.mapDataSubscription = this.caseSelected$.subscribe(({ latitude, longitude }) => {
      this.map && this.map.setCenter(latitude, longitude);
    });

  }

  ngOnDestroy() {
    this.mapDataSubscription.unsubscribe();
    this.caseSubscription.unsubscribe();
  }

  view(item: string) {
    this.router.navigate([item], {
      relativeTo: this.route
    })
  }
}
