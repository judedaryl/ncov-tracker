import { Component, OnInit, Input } from "@angular/core";
import { DailyStatistic } from "src/app/models/daily-statistic";

@Component({
  selector: "app-dashboard-card",
  template: `
    <div class="card">
      <div class="card-body pb-0">
        <div class="d-flex justify-content-between">
          <div>
            <ng-content select="[title]"></ng-content>
            <ng-content select="[description]"></ng-content>
          </div>
          <div class="d-flex align-items-center">
            <h4 class="text-right m-0">{{ value | number }}</h4>
          </div>
        </div>
      </div>
      <div style="height: 100px">
        <app-daily-chart [data]="chart"></app-daily-chart>
      </div>
    </div>
  `,
})
export class DashboardCardComponent implements OnInit {
  @Input() value: number;
  @Input() chart: DailyStatistic[];

  ngOnInit(): void {}
}
