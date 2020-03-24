import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuiRoutingModule } from './pui-routing.module';
import { PuiFacilityShellComponent } from './pui-facility-shell/pui-facility-shell.component';
import { PuiFacilityListComponent } from './pui-facility-list/pui-facility-list.component';
import { PuiRegionShellComponent } from './pui-region-shell/pui-region-shell.component';
import { PuiRegionListComponent } from './pui-region-list/pui-region-list.component';
import { PuiListComponent } from './pui-list/pui-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PuiDetailComponent } from './pui-detail/pui-detail.component';
import { PuiFacilityMobileComponent } from './pui-facility-mobile/pui-facility-mobile.component';
import { PuiRegionMobileComponent } from './pui-region-mobile/pui-region-mobile.component';
import { LayoutModule, BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';


@NgModule({
  declarations: [PuiFacilityShellComponent, PuiFacilityListComponent, PuiRegionShellComponent, PuiRegionListComponent, PuiListComponent, PuiDetailComponent, PuiFacilityMobileComponent, PuiRegionMobileComponent],
  imports: [
    CommonModule,
    PuiRoutingModule,    
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PipesModule,
    LayoutModule
  ],
  providers: [
    BreakpointObserver,
    MediaMatcher,
    Platform
  ]
})
export class PuiModule { }
