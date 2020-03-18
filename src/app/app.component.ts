import { Component, OnInit } from '@angular/core';
import { interval, Observable, from } from 'rxjs';
import { map, mergeMap, filter, startWith } from 'rxjs/operators'
import { ApiService } from './services/api.service';
import { NcovStatistic } from './interfaces/ncov-statistic';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ncov-tracker';

  statisticsData$: Observable<NcovStatistic>;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.setupPullInterval();
  }

  setupPullInterval() {
    var pullInterval = interval(1000);
    this.statisticsData$ = pullInterval.pipe(startWith(0), mergeMap(() => this.apiService.getNcovStatistics()), map(q => 
      q.filter(s => s.country.toLowerCase() === 'philippines')[0]
    ))
    

    const source = from([1, 2, 3, 4, 5]);
//filter out non-even numbers
const example = source.pipe(filter(num => num % 2 === 0));
  }



}
