import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, take, mergeMap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { MapComponent } from 'src/app/shared/map/map.component';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';
import { PuiApiService } from 'src/app/services/pui-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-pui-facility-shell',
  templateUrl: './pui-facility-shell.component.html',
  styleUrls: ['./pui-facility-shell.component.scss']
})
export class PuiFacilityShellComponent implements OnInit, OnDestroy {

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''))
  data$: Observable<Aggregate<PuiTracing>[]>;
  selected$: Observable<PuiTracing>;
  search$ = new BehaviorSubject<string>(null);
  isMobile$: Observable<boolean>;
  mapDataSubscription: Subscription;

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

    this.data$ = combineLatest(this.puiFacTracing.getPuiHospitalFacilityStatistic(), this.filter$).pipe(
      map(([data, filterString]) => data.filter(({ hf }) =>
        hf.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )

    const searchPipe = combineLatest(this.data$.pipe(take(1)), this.search$).pipe(
      mergeMap(values => {
        let toFilter = values[1] || (values[0][0] && values[0][0].hf);
        toFilter = toFilter.split(`'`).join(`''`);
        return this.puiFacTracing.search('hf', toFilter);
      })
    )

    this.selected$ = searchPipe.pipe(
      map(cases => cases[0])
    )

    this.mapDataSubscription = searchPipe.pipe(
      map(data => data[0])
    )
      .subscribe(({ latitude, longitude }) => {
        this.map && this.map.setCenter(latitude, longitude);
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
