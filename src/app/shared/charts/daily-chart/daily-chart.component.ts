import { Component, OnInit, Input, ViewChild } from "@angular/core";
import * as Highcharts from "highcharts";
import { HighchartsChartComponent } from "highcharts-angular";
import { DailyStatistic } from "../../../models/daily-statistic";
@Component({
  selector: "app-daily-chart",
  templateUrl: "./daily-chart.component.html",
  styleUrls: ["./daily-chart.component.scss"],
})
export class DailyChartComponent implements OnInit {
  _data: DailyStatistic[];
  _color: string;

  @Input() set data(data: DailyStatistic[]) {
    this._data = data;
    this.updateChart();
  }

  @Input() set color(color: string) {
    this._color = color;
    this.updateChart();
  }

  updateChart() {
    if (
      this._data !== null &&
      typeof this._data !== "undefined" &&
      typeof this.chart !== "undefined" &&
      typeof this._color !== "undefined"
    ) {
      this.chartOptions.series = this.buildSeries(this._data);
      this.updateFlag = true;
    }
  }

  @ViewChild("chart", { static: true }) chart: HighchartsChartComponent;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = "chart"; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      type: "areaspline",
      panning: {
        enabled: true,
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      gridLineColor: "transparent",
      lineColor: "transparent",
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
      minPadding: 0,
      maxPadding: 0,
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: "",
      },
      tickPixelInterval: 50,
      gridLineColor: "transparent",
      lineColor: "transparent",
    },
    credits: {
      enabled: false,
      text: "Department of Health",
      href: "https://ncovtracker.doh.gov.ph/",
    },
    plotOptions: {
      spline: {
        lineWidth: 3,
      },
      area: {
        fillOpacity: 0.2,
      },
      series: {
        borderColor: "transparent",
        borderWidth: 0,
      },
    },
  };
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  constructor() {}

  ngOnInit() {}

  buildSeries(data: DailyStatistic[]): Highcharts.SeriesOptionsType[] {
    let latestDate =
      data.length === 0 ? new Date() : data[data.length - 1].date;
    let currDate = new Date(latestDate);
    currDate.setMonth(currDate.getMonth() - 2);
    let copy = new Date(currDate.getTime());
    data = data
      .filter(({ date }) => new Date(date).getTime() > currDate.getTime())
      .map(({ value, date }) => ({
        value,
        date: new Date(new Date(date).setHours(0, 0, 0, 0)),
      }));
    let dayDiff =
      (new Date(latestDate).getTime() - currDate.getTime()) /
      (1000 * 60 * 60 * 24);

    let arr = new Array(dayDiff)
      .fill(new Date(copy.setHours(0, 0, 0, 0)))
      .map((date: Date, i) => ({
        value: 0,
        date: new Date(date.setDate(date.getDate() + 1)),
      }));

    arr = arr.map(({ value, date }) => {
      let existing = data.find((q) => q.date.getTime() === date.getTime());
      value += existing ? existing.value : 0;
      return {
        value,
        date,
      };
    });

    const baseSeries: Highcharts.SeriesOptionsType = {
      type: "area",
      name: "",
      data: [],
      marker: {
        radius: 0,
      },
      fillOpacity: 0.2,
    };

    const caseSeries: Highcharts.SeriesOptionsType = {
      ...baseSeries,
      type: "column",
      name: "Confirmed cases",
      color: this._color,
      data: (arr || [])
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(({ value, date }) => ({
          x: date.getTime(),
          y: value,
        })),
    };

    return [caseSeries];
  }

  statisticReducer(
    obj: { [date: number]: { [key: string]: number } },
    { date, value }: DailyStatistic,
    key: string
  ) {
    obj[new Date(date).getTime()] = { [key]: value };
    return obj;
  }

  groupBy(statistics: DailyStatistic[], key: keyof DailyStatistic) {
    return statistics.reduce((rv, x) => {
      rv[`${x[key]}`] = x.value;
      return rv;
    }, {});
  }
}
