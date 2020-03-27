import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { Observable, combineLatest, Subject, Subscription, of, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, debounce, debounceTime } from 'rxjs/operators';
import { MapComponent } from 'src/app/shared/map/map.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { saveAs } from 'file-saver';
import { parse } from 'json2csv';

@Component({
  selector: 'app-case-master-shell',
  templateUrl: './case-master-shell.component.html',
  styleUrls: ['./case-master-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseMasterShellComponent implements OnInit {

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe<string>(startWith(''))
  cases$: Observable<PHCase[]>;
  selectedCase$ = new BehaviorSubject<PHCase>(null);
  mapDataSubscription: Subscription;
  isMobile$: Observable<boolean>;

  @ViewChild('mobielMapContainer', { static: false }) mobileMap: MapComponent;
  @ViewChild('desktopMapContainer', { static: false }) desktopMap: MapComponent;

  constructor(
    private phMaster: PhMasterlistApiService,
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
    this.cases$ = combineLatest(this.phMaster.getAllCases(), this.filter$).pipe(
      debounceTime(300),
      map(([cases, filterString]) => cases.filter(({ facility, nationalit, residence, PH_masterl }) =>
        facility.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
        nationalit.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
        residence.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
        PH_masterl.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
      ))
    )

    setTimeout(() => {
      this.mapDataSubscription = combineLatest(this.cases$, this.selectedCase$).pipe(
        map(([cases, selected]) => selected || cases[0])
      )
        .subscribe(({ latitude, longitude }) => {
          this.mobileMap && this.mobileMap.setCenter(latitude, longitude);
          this.desktopMap && this.desktopMap.setCenter(latitude, longitude);
        });
    }, 300)
  }

  save(cases: PHCase[]) {
    if (cases.length === 0) return;
    const fields = Object.keys(cases[0]);
    const csv = parse(cases, { fields });
    const file = new Blob([csv], { type: 'text/plain' })
    saveAs(file, "PH_Masterlist.csv");
  }


}
