import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AgeGroupStatistic } from 'src/app/interfaces/age-group-statistic';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})
export class AgeChartComponent implements OnInit {
  @Input() set statistics(stats: AgeGroupStatistic[]) {
    this.chartOptions.series = this.buildSeries(stats || []);
    if(typeof this.chart !== 'undefined') {
      this.chart.updateOrCreateChart();
    }
  }

  @ViewChild('chart', {static : false}) chart: HighchartsChartComponent;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    xAxis: {
      type: 'category'
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

  buildSeries = (statistics: AgeGroupStatistic[]): Highcharts.SeriesOptionsType[]  => 
    statistics.map(({ gender, categories }) => ({
      type: 'bar',
      name: gender,
      data: categories.map(({category, value}) => ([category, value]))
    }))

}
