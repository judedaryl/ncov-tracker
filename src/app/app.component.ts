import { Component, OnInit } from '@angular/core';
import { interval, Observable, from, combineLatest } from 'rxjs';
import { map, mergeMap, filter, startWith, take } from 'rxjs/operators'
import { ApiService } from './services/api.service';
import { OverviewStatistics } from './interfaces/overview-statistics';
import { FacilityStatistics } from './interfaces/facility-statistics';
import { ResidenceStatistics } from './interfaces/residence-statistics';
import { FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ncov-tracker';

  statisticsData$: Observable<OverviewStatistics>;
  facilityData$: Observable<FacilityStatistics[]>;
  residenceData$: Observable<ResidenceStatistics[]>;

  facilityFilter: FormControl;
  facilityFilter$: Observable<string>;
  residenceFilter: FormControl;
  residenceFilter$: Observable<string>;

  constructor(private apiService: ApiService, private builder: FormBuilder) {
    this.facilityFilter = builder.control('');
    this.residenceFilter = builder.control('');
    this.facilityFilter$ = this.facilityFilter.valueChanges.pipe(startWith(''));
    this.residenceFilter$ = this.residenceFilter.valueChanges.pipe(startWith(''));

  }

  ngOnInit(): void {
    this.setupPullInterval();
  }

  async setupPullInterval() {
    this.statisticsData$ = interval(10000).pipe(startWith(0), mergeMap(() => this.apiService.getStatistics()));
    this.facilityData$ = combineLatest(this.apiService.getFacilityStatistics(), this.facilityFilter$).pipe(
      map(([facilities, filterString]) => facilities.filter(facility =>
        facility.facility.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )  
    this.residenceData$ = combineLatest(this.apiService.getResidenceStatistics(), this.residenceFilter$).pipe(
      map(([residences, filterString]) => residences.filter(data =>
        data.residence.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )
  }



}
