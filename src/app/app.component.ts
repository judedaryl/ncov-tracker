import { Component, OnInit } from '@angular/core';
import { interval, Observable, from, combineLatest, of, timer } from 'rxjs';
import { map, mergeMap, filter, startWith, take, catchError, retryWhen, tap, delayWhen } from 'rxjs/operators'
import { ApiService } from './services/api.service';
import { OverviewStatistics } from './interfaces/overview-statistics';
import { FacilityStatistics } from './interfaces/facility-statistics';
import { ResidenceStatistics } from './interfaces/residence-statistics';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConfirmedApiService } from './services/confirmed-api.service';
import { CaseStatistic } from './interfaces/case-statistic';
import { AgeGroupStatistic } from './interfaces/age-group-statistic';
import { AgeGroupApiService } from './services/age-group-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ncov-tracker';
  today = new Date();

  statisticsData$: Observable<OverviewStatistics>;
  facilityData$: Observable<FacilityStatistics[]>;
  residenceData$: Observable<ResidenceStatistics[]>;
  caseStatistics$: Observable<CaseStatistic[]>;
  ageGroupStatistics$: Observable<AgeGroupStatistic[]>;

  facilityFilter: FormControl;
  facilityFilter$: Observable<string>;
  residenceFilter: FormControl;
  residenceFilter$: Observable<string>;

  constructor(
    private apiService: ApiService, 
    private confirmedApiService: ConfirmedApiService,
    private ageGroupApiService: AgeGroupApiService,
    builder: FormBuilder) {
    this.facilityFilter = builder.control('');
    this.residenceFilter = builder.control('');
    this.facilityFilter$ = this.facilityFilter.valueChanges.pipe(startWith(''));
    this.residenceFilter$ = this.residenceFilter.valueChanges.pipe(startWith(''));

  }

  ngOnInit(): void {
    this.setupPullInterval();
  }

  async setupPullInterval() {
    this.statisticsData$ = interval(10000).pipe(
      startWith(0),
       mergeMap(() => this.apiService.getStatistics()),
       retryWhen((errors) => 
       errors.pipe(
        tap((err) => console.log(err)),
        delayWhen(() => timer(1000))
      )
      ),
       catchError(() => {
         let overview: OverviewStatistics = {
           confirmed: 0,
           recovered: 0,
           asOfDate: new Date(),
           deaths: 0,
           personsMonitored: 0,
           testConducted: 0,
           personsInvestigated: 0
         }
         return of(overview);
       }     
      )
    );

    this.facilityData$ = combineLatest(this.apiService.getFacilityStatistics(), this.facilityFilter$).pipe(
      map(([facilities, filterString]) => facilities.filter(facility =>
        facility.facility.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )  
    this.residenceData$ = combineLatest(this.apiService.getResidenceStatistics(), this.residenceFilter$).pipe(
      map(([residences, filterString]) => residences.filter(data =>
        data.residence.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )

    this.caseStatistics$ = this.confirmedApiService.getConfirmedStatistics();

    this.ageGroupStatistics$ = this.ageGroupApiService.getAgeGroupStatistics();
  }



}
