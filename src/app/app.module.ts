import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PercentPipe } from './pipes/percent.pipe';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CaseChartComponent } from './components/case-chart/case-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgeChartComponent } from './components/age-chart/age-chart.component';
import { ResidenceChartComponent } from './components/residence-chart/residence-chart.component';
import { NationalityChartComponent } from './components/nationality-chart/nationality-chart.component';
import { TwitterFeedComponent } from './components/social/twitter-feed/twitter-feed.component';
import { FacebookFeedComponent } from './components/social/facebook-feed/facebook-feed.component';
import { FacebookShareComponent } from './components/social/facebook-share/facebook-share.component';
import { TwitterTweetComponent } from './components/social/twitter-tweet/twitter-tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    PercentPipe,
    StatCardComponent,
    CaseChartComponent,
    AgeChartComponent,
    ResidenceChartComponent,
    NationalityChartComponent,
    TwitterFeedComponent,
    FacebookFeedComponent,
    FacebookShareComponent,
    TwitterTweetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
