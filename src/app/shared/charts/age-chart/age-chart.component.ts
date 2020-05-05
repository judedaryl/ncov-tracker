import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { AgeGroupDistribution } from 'src/app/graphql/distribution.query';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})
export class AgeChartComponent implements OnInit {
  @Input() set statistics(stats: AgeGroupDistribution[]) {
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

  buildSeries(statistics: AgeGroupDistribution[]): Highcharts.SeriesOptionsType[] {
    statistics = statistics.filter(({sex}) => sex !== '');
    let hashMap: { [id: string]: AgeGroupDistribution[] } = statistics.reduce((obj, val) => {
      (obj[val.sex] = obj[val.sex] || []).push(val);
      return obj;
    }, {})

    let stats = Object.keys(hashMap).map((key: string) => ({
      gender: key,
      categories: hashMap[key]
      .sort((a,b) => parseInt(a.ageGroup) - parseInt(b.ageGroup))
      .map(({ ageGroup, value }) => ({
        category: ageGroup,
        value
      }))
        .filter(({ category }) => category !== '')
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
