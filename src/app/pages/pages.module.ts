import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { ShortcutCardComponent } from './landing/shortcut-card/shortcut-card.component';
import { AboutComponent } from './about/about.component';
import { OpenSourceComponent } from './open-source/open-source.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardCardComponent } from './landing/dashboard.card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingComponent, ShortcutCardComponent, AboutComponent, OpenSourceComponent,
    DashboardCardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule {
}
