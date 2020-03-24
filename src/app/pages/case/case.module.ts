import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseRoutingModule } from './case-routing.module';
import { CaseFacilityShellComponent } from './case-facility-shell/case-facility-shell.component';
import { CaseFacilityListComponent } from './case-facility-list/case-facility-list.component';
import { CaseResidenceShellComponent } from './case-residence-shell/case-residence-shell.component';
import { CaseResidenceListComponent } from './case-residence-list/case-residence-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import { CaseListComponent } from './case-list/case-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule, BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CaseFacilityMobileComponent } from './case-facility-mobile/case-facility-mobile.component';
import { CaseResidenceMobileComponent } from './case-residence-mobile/case-residence-mobile.component';


@NgModule({
  declarations: [
    CaseFacilityShellComponent,
    CaseFacilityListComponent,
    CaseResidenceShellComponent,
    CaseResidenceListComponent,
    CaseDetailComponent,
    CaseListComponent,
    CaseFacilityMobileComponent,
    CaseResidenceMobileComponent
  ],
  imports: [
    LayoutModule,
    PlatformModule,
    CommonModule,
    CaseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PipesModule
  ],
  providers: [
    BreakpointObserver,
    MediaMatcher,
    Platform
  ]
})
export class CaseModule { }
