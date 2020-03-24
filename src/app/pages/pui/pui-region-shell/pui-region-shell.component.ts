import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, take, mergeMap, map, combineAll, withLatestFrom } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription, combineLatest, forkJoin, Subject } from 'rxjs';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';
import { MapComponent } from 'src/app/shared/map/map.component';
import { PuiApiService } from 'src/app/services/pui-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-pui-region-shell',
  templateUrl: './pui-region-shell.component.html',
  styleUrls: ['./pui-region-shell.component.scss']
})
export class PuiRegionShellComponent implements OnInit, OnDestroy {

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''))
  data$: Observable<Aggregate<PuiTracing>[]>;
  selected$: Observable<PuiTracing>;
  search$ = new BehaviorSubject<string>(null);
  puis$: Observable<PuiTracing[]>;
  puiSelected$ = new Subject<PuiTracing>();

  mapDataSubscription: Subscription;
  puiSubscription: Subscription;
  isMobile$: Observable<boolean>;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;



  constructor(
    private puiFacTracing: PuiApiService,
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

    this.data$ = combineLatest(this.puiFacTracing.getPuiRegionStatistic(), this.filter$).pipe(
      map(([data, filterString]) => data.filter(({ region }) =>
        region.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )

    this.puis$ = combineLatest(this.data$.pipe(take(1)), this.search$).pipe(
      mergeMap(values => {
        let toFilter = values[1] || (values[0][0] && values[0][0].region);
        toFilter = toFilter.split(`'`).join(`''`);
        return this.puiFacTracing.search('region', toFilter);
      })
    )

    this.selected$ = this.puis$.pipe(
      map(cases => cases[0])
    )

    this.puiSubscription = this.puis$.subscribe(puis => {
      this.puiSelected$.next(puis[0]);
    })

    this.mapDataSubscription = this.puiSelected$.
      subscribe(({ latitude, longitude }) => {
        this.map && this.map.setCenter(latitude, longitude);
      });

  }
  ngOnDestroy() {
    this.puiSubscription.unsubscribe();
    this.mapDataSubscription.unsubscribe();
  }

  
  view(item: string) {
    this.router.navigate([item], {
      relativeTo: this.route
    })
  }

}
