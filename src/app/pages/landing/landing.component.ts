import { Component, OnInit } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { mergeMap, startWith, map } from 'rxjs/operators';
import { HeaderService } from 'src/app/services/header.service';
import { ChartsAccumulatedQuery, Accumulation } from 'src/app/graphql/charts-accumulated.query';
import {  StatisticsQuery, CovidStatistics } from 'src/app/graphql/statistics.query';
import { DistributionQuery, AgeGroupDistribution } from 'src/app/graphql/distribution.query';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  statisticsData$: Observable<CovidStatistics>;
  caseStatistics$: Observable<Accumulation[][]>;
  ageGroupStatistics$: Observable<AgeGroupDistribution[]>;
  
  today = new Date();
  showAlert = true;

  constructor(
    private distributionQuery: DistributionQuery,
    private accumulatedChartsQuery: ChartsAccumulatedQuery,
    private statisticsQuery: StatisticsQuery,
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

    this.accumulatedChartsQuery.fetch().subscribe(q => {
      console.log(q);
    });
    
    this.setPullInterval();
  }


  setPullInterval() {
    this.statisticsData$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.statisticsQuery.fetch()),
      map(q => q.data.statistics)
    );

    this.caseStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.accumulatedChartsQuery.fetch()),
      map(({data}) => data ? [data.total, data.recovered, data.died] : [[],[],[]])
    )

    this.ageGroupStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.distributionQuery.fetch()),
      map(q => q.data.total)
    )
  }

}
