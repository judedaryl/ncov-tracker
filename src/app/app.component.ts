import { Component, OnInit } from '@angular/core';
import { interval, Observable, from } from 'rxjs';
import { map, mergeMap, filter, startWith, take } from 'rxjs/operators'
import { ApiService } from './services/api.service';
import { OverviewStatistics } from './interfaces/overview-statistics';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ncov-tracker';

  statisticsData$: Observable<OverviewStatistics>;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.setupPullInterval();
  }

  async setupPullInterval() {
    this.statisticsData$ = interval(10000).pipe(startWith(0), mergeMap(() => this.apiService.getStatistics()));
  }



}
