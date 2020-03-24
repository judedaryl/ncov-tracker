import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeChartComponent } from './charts/age-chart/age-chart.component';
import { CaseChartComponent } from './charts/case-chart/case-chart.component';
import { NationalityChartComponent } from './charts/nationality-chart/nationality-chart.component';
import { ResidenceChartComponent } from './charts/residence-chart/residence-chart.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { FacebookFeedComponent } from './social/facebook-feed/facebook-feed.component';
import { TwitterTweetComponent } from './social/twitter-tweet/twitter-tweet.component';
import { TwitterFeedComponent } from './social/twitter-feed/twitter-feed.component';
import { FacebookShareComponent } from './social/facebook-share/facebook-share.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MobileSearchComponent } from './mobile-search/mobile-search.component';


@NgModule({
  declarations: [
    AgeChartComponent,
    CaseChartComponent,
    NationalityChartComponent,
    ResidenceChartComponent,
    StatCardComponent,
    TwitterTweetComponent,
    TwitterFeedComponent,
    FacebookShareComponent,
    FacebookFeedComponent,
    MapComponent,
    FooterComponent,
    MobileHeaderComponent,
    MobileSearchComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AgeChartComponent,
    CaseChartComponent,
    NationalityChartComponent,
    ResidenceChartComponent,
    StatCardComponent,
    TwitterTweetComponent,
    TwitterFeedComponent,
    FacebookShareComponent,
    FacebookFeedComponent,
    MapComponent,
    FooterComponent,
    MobileHeaderComponent,
    MobileSearchComponent
  ]
})
export class SharedModule { }
