import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Confirmed } from 'src/app/arcgis/confirmed';
import { Accumulation } from 'src/app/graphql/charts-accumulated.query';

@Component({
  selector: 'app-case-chart',
  templateUrl: './case-chart.component.html',
  styleUrls: ['./case-chart.component.scss']
})
export class CaseChartComponent implements OnInit {

  @Input() set caseStatistics(accumulations: Accumulation[][]) {
    if (accumulations != null && typeof accumulations !== 'undefined' && typeof this.chart !== 'undefined') {
      this.chartOptions.series = this.buildSeries(accumulations[0], accumulations[1], accumulations[2]);
      this.chart.updateOrCreateChart();
    }

  }

  @ViewChild('chart', { static: false }) chart: HighchartsChartComponent;

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
      text: 'Department of Health',
      href: 'https://ncovtracker.doh.gov.ph/'
    },
    plotOptions: {
      spline: {
        lineWidth: 3
      }
    }
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit() {
  }

  buildSeries(total: Accumulation[], recovered: Accumulation[], died: Accumulation[]): Highcharts.SeriesOptionsType[] {
    const baseSeries: Highcharts.SeriesOptionsType = {
      type: 'spline',
      name: '',
      data: [],
      marker: {
        radius: 0
      }
    }

    const caseSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      name: 'Confirmed cases',
      color: 'var(--primary)',
      data: (total || []).sort((a, b) => new Date(a.accumulator).getTime() - new Date(b.accumulator).getTime()).map(({ value, accumulator }) => ({
        x: new Date(accumulator).getTime(),
        y: value
      }))
    }

    const diedSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      name: 'Died',
      color: 'var(--danger)',
      data: (died || []).sort((a, b) => new Date(a.accumulator).getTime() - new Date(b.accumulator).getTime()).map(({ value, accumulator }) => ({
        x: new Date(accumulator).getTime(),
        y: value
      }))
    }

    const recoveredSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      name: 'Recovered',
      color: 'var(--success)',
      data: (recovered || []).sort((a, b) => new Date(a.accumulator).getTime() - new Date(b.accumulator).getTime()).map(({ value, accumulator }) => ({
        x: new Date(accumulator).getTime(),
        y: value
      }))
    }


    return [caseSeries, recoveredSeries, diedSeries]
  }

}
