import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { ShortcutCardComponent } from './landing/shortcut-card/shortcut-card.component';
import { AboutComponent } from './about/about.component';
import { OpenSourceComponent } from './open-source/open-source.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [LandingComponent, ShortcutCardComponent, AboutComponent, OpenSourceComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class PagesModule {
  constructor() {
    console.log('loaded')
  }
}
