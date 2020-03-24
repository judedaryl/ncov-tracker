import { Component, OnInit } from '@angular/core';
import { HeaderService } from './services/header.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ncov-tracker';
  today = new Date();

  // statisticsData$: Observable<OverviewStatistics>;
  // facilityData$: Observable<FacilityStatistics[]>;
  // residenceData$: Observable<ResidenceStatistics[]>;
  // caseStatistics$: Observable<CaseStatistic[]>;
  // ageGroupStatistics$: Observable<AgeGroupStatistic[]>;
  // inventoryData$: Observable<InventoryStatistic[]>;
  // nationalityData$: Observable<AggregatedStatistic[]>;
  // puiRegionData$: Observable<AggregatedStatistic[]>;
  // puiFacilityData$: Observable<AggregatedStatistic[]>;

  // facilityFilter: FormControl;
  // facilityFilter$: Observable<string>;
  // residenceFilter: FormControl;
  // residenceFilter$: Observable<string>;
  // inventoryFilter: FormControl;
  // inventoryFilter$: Observable<string>;
  // puiRegionFilter: FormControl;
  // puiRegionFilter$: Observable<string>;
  // puiFacilityFilter: FormControl;
  // puiFacilityFilter$: Observable<string>;

  showAlert = true;

  showHeader$: Observable<boolean>;
  constructor(headerService: HeaderService) {

    this.showHeader$ = headerService.showChanges
    ;
    // this.facilityFilter = builder.control('');
    // this.residenceFilter = builder.control('');
    // this.inventoryFilter = builder.control('');
    // this.puiRegionFilter = builder.control('');
    // this.puiFacilityFilter = builder.control('');

    // this.facilityFilter$ = this.facilityFilter.valueChanges.pipe(startWith(''));
    // this.residenceFilter$ = this.residenceFilter.valueChanges.pipe(startWith(''));
    // this.inventoryFilter$ = this.inventoryFilter.valueChanges.pipe(startWith(''));
    // this.puiRegionFilter$ = this.puiRegionFilter.valueChanges.pipe(startWith(''));
    // this.puiFacilityFilter$ = this.puiFacilityFilter.valueChanges.pipe(startWith(''));

    this.showAlert = localStorage.getItem('show-alert') !== 'false';
  }

  closeAlert() {
    this.showAlert = false;
    localStorage.setItem('show-alert', 'false')
  }

  ngOnInit(): void {
    this.setupPullInterval();
  }

  async setupPullInterval() {
    // this.statisticsData$ = interval(10000).pipe(
    //   startWith(0),
    //   mergeMap(() => this.apiService.getStatistics()),
    //   retryWhen((errors) =>
    //     errors.pipe(
    //       tap((err) => console.log(err)),
    //       delayWhen(() => timer(1000))
    //     )
    //   ),
    //   catchError(() => {
    //     let overview: OverviewStatistics = {
    //       confirmed: 0,
    //       recovered: 0,
    //       asOfDate: new Date(),
    //       deaths: 0,
    //       personsMonitored: 0,
    //       testConducted: 0,
    //       personsInvestigated: 0
    //     }
    //     return of(overview);
    //   }
    //   )
    // );

    // this.facilityData$ = combineLatest(this.apiService.getFacilityStatistics(), this.facilityFilter$).pipe(
    //   map(([facilities, filterString]) => facilities.filter(facility =>
    //     facility.facility.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    // )
    // this.residenceData$ = combineLatest(this.apiService.getResidenceStatistics(), this.residenceFilter$).pipe(
    //   map(([residences, filterString]) => residences.filter(data =>
    //     data.residence.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    // )

    // this.inventoryData$ = combineLatest(this.inventoryApiService.getInventoryStatistics(), this.inventoryFilter$).pipe(
    //   map(([arr, filterString]) => arr.filter(data =>
    //     data.region.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    // )

    // this.puiRegionData$ = combineLatest(this.puiApiService.getPuiRegionStatistic(), this.puiRegionFilter$).pipe(
    //   map(([arr, filterString]) => arr.filter(data =>
    //     data.aggregateKey.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    // )

    // this.puiFacilityData$ = combineLatest(this.puiApiService.getPuiHospitalFacilityStatistic(), this.puiFacilityFilter$).pipe(
    //   map(([arr, filterString]) => arr.filter(data =>
    //     data.aggregateKey.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    // )
    // this.caseStatistics$ = this.confirmedApiService.getConfirmedStatistics();
    // this.ageGroupStatistics$ = this.ageGroupApiService.getAgeGroupStatistics();
    // this.nationalityData$ = this.apiService.getNationalityStatistic();

  }



}
