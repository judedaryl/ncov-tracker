import { Component, OnInit } from '@angular/core';
import { SlidingFigureApiService } from 'src/app/services/sliding-figure-api.service';
import { Observable, interval } from 'rxjs';
import { mergeMap, startWith } from 'rxjs/operators';
import { SlidingFigure } from 'src/app/arcgis/sliding-figure';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { AgeGroupApiService } from 'src/app/services/age-group-api.service';
import { AgeGroup } from 'src/app/arcgis/age-group';
import { Confirmed } from 'src/app/arcgis/confirmed';
import { PhMasterlistApiService } from 'src/app/services/ph-masterlist-api.service';
import { ConfirmedApiService } from 'src/app/services/confirmed-api.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  statisticsData$: Observable<SlidingFigure>;
  caseStatistics$: Observable<Confirmed[]>;
  ageGroupStatistics$: Observable<Aggregate<AgeGroup>[]>;
  nationalityStatistics$: Observable<Aggregate<AgeGroup>[]>;
  
  today = new Date();
  showAlert = true;

  constructor(
    private slideFigService: SlidingFigureApiService,
    private ageGroup: AgeGroupApiService,
    private phMaster: PhMasterlistApiService,
    private confirmedService: ConfirmedApiService,
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


  setPullInterval() {
    this.statisticsData$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.slideFigService.getStatistics())
    )

    this.caseStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.confirmedService.getConfirmedStatistics())
    )

    this.ageGroupStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.ageGroup.getAgeGroupStatistics())
    )

    this.nationalityStatistics$ = interval(1000000).pipe(
      startWith(0),
      mergeMap(() => this.phMaster.getNationalityStatistic())
    )
  }

}
