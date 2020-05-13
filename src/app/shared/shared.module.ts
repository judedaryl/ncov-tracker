import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgeChartComponent } from "./charts/age-chart/age-chart.component";
import { CaseChartComponent } from "./charts/case-chart/case-chart.component";
import { StatCardComponent } from "./stat-card/stat-card.component";
import { FacebookFeedComponent } from "./social/facebook-feed/facebook-feed.component";
import { TwitterTweetComponent } from "./social/twitter-tweet/twitter-tweet.component";
import { TwitterFeedComponent } from "./social/twitter-feed/twitter-feed.component";
import { FacebookShareComponent } from "./social/facebook-share/facebook-share.component";
import { HighchartsChartModule } from "highcharts-angular";
import { MapComponent } from "./map/map.component";
import { FooterComponent } from "./footer/footer.component";
import { MobileHeaderComponent } from "./mobile-header/mobile-header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MobileSearchComponent } from "./mobile-search/mobile-search.component";
import { DailyChartComponent } from "./charts/daily-chart/daily-chart.component";
import { LocationStatisticTableComponent } from "./location-statistic-table/location-statistic-table.component";
import { DirectivesModule } from "../directives/directives.module";
import { PaginationModule } from "ngx-bootstrap/pagination";

@NgModule({
  declarations: [
    AgeChartComponent,
    CaseChartComponent,
    StatCardComponent,
    TwitterTweetComponent,
    TwitterFeedComponent,
    FacebookShareComponent,
    FacebookFeedComponent,
    MapComponent,
    FooterComponent,
    MobileHeaderComponent,
    MobileSearchComponent,
    DailyChartComponent,
    LocationStatisticTableComponent,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DirectivesModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    AgeChartComponent,
    CaseChartComponent,
    StatCardComponent,
    TwitterTweetComponent,
    TwitterFeedComponent,
    FacebookShareComponent,
    FacebookFeedComponent,
    MapComponent,
    FooterComponent,
    MobileHeaderComponent,
    MobileSearchComponent,
    DailyChartComponent,
    LocationStatisticTableComponent,
  ],
})
export class SharedModule {}
