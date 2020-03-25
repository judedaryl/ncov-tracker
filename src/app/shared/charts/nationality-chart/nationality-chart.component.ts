import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-nationality-chart',
  templateUrl: './nationality-chart.component.html',
  styleUrls: ['./nationality-chart.component.scss']
})
export class NationalityChartComponent implements OnInit {
  @Input() set statistics(stats: Aggregate<PHCase>[]) {
    this.chartOptions.series = this.buildSeries(stats || []);
    if (typeof this.chart !== 'undefined') {
      this.chart.updateOrCreateChart();
    }
  }

  @ViewChild('chart', { static: false }) chart: HighchartsChartComponent;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: '',
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
      text: 'Department of Health',
      href: 'https://ncovtracker.doh.gov.ph/'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    tooltip: {
      pointFormatter: function() {
       
        return `${this.x}`
      }
    }
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false


  constructor() { }

  ngOnInit() {
  }
  
  buildSeries(statistics: Aggregate<PHCase>[]): Highcharts.SeriesOptionsType[] {
    let series: Highcharts.SeriesOptionsType[] = [{
      name: 'Case by residence',
      type: 'pie',
      colorByPoint: true,
      data: statistics.map(({ nationalit, value }) => ({
        name: nationalit,
        y: Math.log1p(value) / Math.LN10,
        x: value
      })),

    }]
    return series;
  }
}
