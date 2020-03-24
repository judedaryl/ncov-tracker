import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { AgeGroup, GenderGroup } from 'src/app/arcgis/age-group';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})
export class AgeChartComponent implements OnInit {
  @Input() set statistics(stats:  Aggregate<AgeGroup>[]) {
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
      type: 'bar',
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
      type: 'category',
    },
    yAxis: {
      labels: {
        enabled: true,
        formatter: function () {
          return Math.abs(this.value).toString();
        }
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
    tooltip: {
      formatter: function () {
        return Math.abs(this.point.y).toString();
      }
    }
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false


  constructor() { }

  ngOnInit() {
  }

  buildSeries(statistics: Aggregate<AgeGroup>[]): Highcharts.SeriesOptionsType[] {

    let hashMap: { [id: string]: Aggregate<AgeGroup>[] } = statistics.reduce((obj, val) => {
      (obj[val.sex] = obj[val.sex] || []).push(val);
      return obj;
    }, {})

    let stats = Object.keys(hashMap).map((key: GenderGroup) => ({
      gender: key,
      categories: hashMap[key].map(({ age_categ, value }) => ({
        category: age_categ,
        value
      }))
    }));

    return stats.map(({ gender, categories }) => ({
      type: 'bar',
      name: gender,
      data: categories.map(({ category, value }) => ([category, gender === 'Female' ? -value : value])),
      color: gender === 'Female' ? 'var(--primary)' : 'var(--secondary)',
      tooltip: {}
    }))
  }

}
