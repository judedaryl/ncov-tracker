import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { Observable, combineLatest, Subject, Subscription, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, debounce, debounceTime } from 'rxjs/operators';
import { MapComponent } from 'src/app/shared/map/map.component';

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
  selectedCase$ = new Subject<PHCase>();
  mapDataSubscription: Subscription;

  @ViewChild(MapComponent, { static: false }) map: MapComponent;

  constructor(private phMaster: PhMasterlistApiService) { }

  ngOnInit() {

    // this.cases$ = of([]);

    this.cases$ = combineLatest(this.phMaster.getAllCases(), this.filter$).pipe(
      debounceTime(300),
      map(([cases, filterString]) => cases.filter(({ facility, nationalit, residence, PH_masterl }) =>
        facility.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
        nationalit.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
        residence.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ||
        PH_masterl.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
      ))
    )

    this.mapDataSubscription = combineLatest(this.cases$, this.selectedCase$).pipe(
      map(([cases, selected]) => selected && cases[0])
    )
      .subscribe(phCase => {
        console.log(phCase)
        this.map && this.map.setCenter(phCase.latitude, phCase.longitude);
      });
  }

}
