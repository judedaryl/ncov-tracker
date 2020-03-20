import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CaseStatistic } from 'src/app/interfaces/case-statistic';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-case-chart',
  templateUrl: './case-chart.component.html',
  styleUrls: ['./case-chart.component.scss']
})
export class CaseChartComponent implements OnInit {

  @Input() set caseStatistics(stats: CaseStatistic[]) {
    this.chartOptions.series = this.buildSeries(stats);
    if(typeof this.chart !== 'undefined') {
      this.chart.updateOrCreateChart();
    }
  }

  @ViewChild('chart', {static : false}) chart: HighchartsChartComponent;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      labels: {
        enabled: true
      },
      title: {
        text: ''
      },
      tickPixelInterval: 50
    },
    credits: {
      enabled: true,
      text: 'Department of Health'
    }
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit() {
  }

  buildSeries(caseStatistics: CaseStatistic[]): Highcharts.SeriesOptionsType[] {
    const stats = caseStatistics || [];
    const baseSeries: Highcharts.SeriesOptionsType = {
      type: 'spline',
      name: '',
      data: [],
      marker: {
        radius: 3
      }
    }

    const caseSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries, 
      name: 'Admitted',
      color: 'var(--primary)',
      data: stats.map(({ date, admitted }) => ({
        y: admitted,
        x: date
      }))
    }

    const recoverySeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      name: 'Recovered',
      color: 'var(--success)',
      data: stats.map(({ date, recovered }) => ({
        y: recovered,
        x: date
      }))
    }

    const deathSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      name: 'Deaths',
      color: 'var(--danger)',
      data: stats.map(({ date, deaths }) => ({
        y: deaths,
        x: date
      }))
    }

    return [caseSeries, recoverySeries, deathSeries]
  }

}
