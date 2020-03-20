import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AggregatedStatistic } from 'src/app/interfaces/aggregated-statistic';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-nationality-chart',
  templateUrl: './nationality-chart.component.html',
  styleUrls: ['./nationality-chart.component.scss']
})
export class NationalityChartComponent implements OnInit {
  @Input() set statistics(stats: AggregatedStatistic[]) {
    this.chartOptions.series = this.buildSeries(stats || []);
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
      type: 'category',
      labels: {
        enabled: false
      }
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

  buildSeries(statistics: AggregatedStatistic[]): Highcharts.SeriesOptionsType[] {
    // let series: Highcharts.SeriesOptionsType[] = [{
    //   name: 'Case by residence',
    //   type: 'column',
    //   colorByPoint: true,
    //   data: statistics.map(({aggregateKey, value}) => ([aggregateKey, value]))
    // }]

    return statistics.map(({aggregateKey, value}) => ({
      name: aggregateKey,
      type: 'column',
      data: [value]
    }))
    // return series;
  }

  // buildSeries = (statistics: AggregatedStatistic[]): Highcharts.SeriesOptionsType[]  => 
  //   statistics.map(({ value, aggregateKey }) => ({
  //     type: 'column',
  //     data: [{
  //       name: aggregateKey,
  //       y: value
  //     }]
  //   }))

}
