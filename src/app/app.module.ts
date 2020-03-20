import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PercentPipe } from './pipes/percent.pipe';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CaseChartComponent } from './components/case-chart/case-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgeChartComponent } from './components/age-chart/age-chart.component'
@NgModule({
  declarations: [
    AppComponent,
    PercentPipe,
    StatCardComponent,
    CaseChartComponent,
    AgeChartComponent
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
