import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { DailyStatistic } from '../../../models/daily-statistic';
@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss']
})
export class DailyChartComponent implements OnInit {

  @Input() data: DailyStatistic[];
  @Input() color: string;

  // @Input() set data(data: DailyStatistic[]) {
  //   console.log(data)
  //   if (data != null && typeof data !== 'undefined' && typeof this.chart !== 'undefined') {

  //     this.chartOptions.series = this.buildSeries(data);
  //     this.chart.updateOrCreateChart();
  //   }
  // }

  @ViewChild('chart', { static: true }) chart: HighchartsChartComponent;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      type: 'areaspline',
      panning: {
        enabled: true
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      gridLineColor: 'transparent',
      lineColor: 'transparent',
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0,
      minPadding: 0,
      maxPadding: 0
    },
    yAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: ''
      },
      tickPixelInterval: 50,
      gridLineColor: 'transparent',
      lineColor: 'transparent'
    },
    credits: {
      enabled: false,
      text: 'Department of Health',
      href: 'https://ncovtracker.doh.gov.ph/'
    },
    plotOptions: {
      spline: {
        lineWidth: 3
      },
      area: {
        fillOpacity: 0.2
      },
      series: {
        borderColor: 'transparent',
        borderWidth: 0
      }
    }
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit() {
      if (this.data != null && typeof this.data !== 'undefined' && typeof this.chart !== 'undefined') {
        this.chartOptions.series = this.buildSeries(this.data);
      }
  }

  buildSeries(data: DailyStatistic[]): Highcharts.SeriesOptionsType[] {
    let currDate = new Date();
    currDate.setMonth(currDate.getMonth() - 2)
    data = data.filter(({ date }) => new Date(date).getTime() > currDate.getTime())
    const baseSeries: Highcharts.SeriesOptionsType = {
      type: 'area',
      name: '',
      data: [],
      marker: {
        radius: 0
      },
      fillOpacity: 0.2
    }

    const caseSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      type: 'column',
      name: 'Confirmed cases',
      color: this.color,
      data: (data || []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(({ value, date }) => ({
        x: new Date(date).getTime(),
        y: value
      }))
    }

    return [caseSeries]
  }

  statisticReducer(obj: { [date: number]: { [key: string]: number } }, { date, value }: DailyStatistic, key: string) {
    obj[new Date(date).getTime()] = { [key]: value }
    return obj;
  }

  groupBy(statistics: DailyStatistic[], key: keyof DailyStatistic) {
    return statistics.reduce((rv, x) => {
      rv[`${x[key]}`] = x.value;
      return rv;
    }, {});
  }


}
