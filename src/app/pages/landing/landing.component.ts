import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Observable, interval, of, combineLatest, merge, Subscription } from 'rxjs';
import { mergeMap, startWith, map, finalize, debounceTime } from 'rxjs/operators';
import { HeaderService } from 'src/app/services/header.service';
import { ChartsAccumulatedQuery, Accumulation } from 'src/app/graphql/charts-accumulated.query';
import { StatisticsQuery } from 'src/app/graphql/statistics.query';
import { DistributionQuery, AgeGroupDistribution } from 'src/app/graphql/distribution.query';
import { ChartsDailyQuery } from 'src/app/graphql/charts-daily.query';
import { DailyStatistic } from 'src/app/models/daily-statistic';
import { CaseStatistics } from 'src/app/models/case-statistics';
import { DashboardQuery, DashboardQueryData } from './dashboard.query';
import { Apollo } from 'apollo-angular';
import { SelectItem } from 'src/app/models/select-item';
import gql from 'graphql-tag';
import { regionQuery, provinceQuery, cityQuery, RegionQuery, ProvinceQuery, ProvinceQueryVariables, CityQuery, CityQueryVariables } from './landing.queries';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LocationQueryData, LocationQuery } from './location.query';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  locationDisplay: Observable<string>;

  dashboardData$: Observable<DashboardQueryData>;
  caseStatistics$: Observable<Accumulation[][]>;
  ageGroupStatistics$: Observable<AgeGroupDistribution[]>;
  locationData$: Observable<LocationQueryData>;

  regionSelect$: Observable<SelectItem[]>;
  provinceSelect$: Observable<SelectItem[]>;
  citySelect$: Observable<SelectItem[]>;

  regions: SelectItem[];
  provinces: SelectItem[];
  cities: SelectItem[];

  regionSubscription: Subscription;
  citySubscription: Subscription;
  provinceSubscription: Subscription;

  locationForm = new FormGroup({
    region: new FormControl(''),
    province: new FormControl(''),
    city: new FormControl('')
  })
  regionControl = this.locationForm.get('region');
  provinceControl = this.locationForm.get('province');
  cityControl = this.locationForm.get('city');

  today = new Date();
  showAlert = true;

  constructor(
    private dashboardQuery: DashboardQuery,
    private distributionQuery: DistributionQuery,
    private accumulatedChartsQuery: ChartsAccumulatedQuery,
    private apollo: Apollo,
    private modalService: BsModalService,
    private locationQuery: LocationQuery,
    header: HeaderService
  ) {
    header.show();
    this.showAlert = localStorage.getItem('show-alert') !== 'false';
  }

  closeAlert() {
    this.showAlert = false;
    localStorage.setItem('show-alert', 'false')
  }

  ngOnInit() {
    this.setPullInterval();
  }
  ngOnDestroy() {
    this.regionSubscription.unsubscribe()
    this.provinceSubscription.unsubscribe()
    this.citySubscription.unsubscribe()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered'
    });
  }


  setPullInterval() {

    this.caseStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.accumulatedChartsQuery.fetch()),
      map(({ data }) => data ? [data.total, data.recovered, data.died] : [[], [], []])
    )

    this.dashboardData$ = combineLatest(
      interval(100000).pipe(startWith(0)),
      this.locationForm.valueChanges.pipe(
        startWith({
          region: '',
          province: '',
          city: ''
        })
      )).pipe(
        mergeMap((val) => {
          return this.dashboardQuery.fetch(val[1])
        }),
        map(({ data }) => data)
      )

    this.ageGroupStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.distributionQuery.fetch()),
      map(q => q.data.total)
    )

    this.regionSubscription = this.apollo.watchQuery<RegionQuery>({
      query: regionQuery
    }).valueChanges.pipe(
      mergeMap(q => {
        this.regionControl.reset('');
        return of(q)
      }),
      map(q => q.data.region),
    ).subscribe(val => {
      this.regions = val;
    })

    this.provinceSubscription = this.regionControl.valueChanges.pipe(
      startWith(''),
      mergeMap((region) => {
        this.provinceControl.reset('');
        this.cityControl.reset('');
        return this.apollo.watchQuery<ProvinceQuery, ProvinceQueryVariables>({
          query: provinceQuery,
          variables: {
            region: region || ''
          }
        }).valueChanges
      }),
      map(q => q.data.province)
    ).subscribe(val => {
      this.provinces = val;
    })

    this.citySubscription = combineLatest(
      this.regionControl.valueChanges.pipe(startWith('')),
      this.provinceControl.valueChanges.pipe(startWith(''))).pipe(
        mergeMap(val => {
          this.cityControl.reset('');
          let region = val[0] || ''
          let province = val[1] || ''
          return this.apollo.watchQuery<CityQuery, CityQueryVariables>({
            query: cityQuery,
            variables: {
              region,
              province
            }
          }).valueChanges
        }),
        map(q => q.data.city)
      ).subscribe(val => {
        this.cities = val;
      })

    this.locationDisplay = this.locationForm.valueChanges.pipe(
      startWith({
        region: '',
        province: '',
        city: ''
      }),
      debounceTime(100),
      map((formVal) => {
        const { region, province, city } = formVal;
        if (city) {
          return city;
        } else if (province) {
          return province;
        } else if (region) {
          return region;
        } else {
          return 'Philippines'
        }
      })
    )

    this.locationData$ = this.locationQuery.fetch().pipe(
      map(apollo => 
       {
         console.log(apollo.data)
         return   apollo.data;
       }
      )
    )
  }

}
