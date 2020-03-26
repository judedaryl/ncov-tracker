import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseFacilityShellComponent } from './case-facility-shell/case-facility-shell.component';
import { CaseResidenceShellComponent } from './case-residence-shell/case-residence-shell.component';
import { CaseFacilityMobileComponent } from './case-facility-mobile/case-facility-mobile.component';
import { CaseResidenceMobileComponent } from './case-residence-mobile/case-residence-mobile.component';
import { CaseMasterShellComponent } from './case-master-shell/case-master-shell.component';


const routes: Routes = [
  {
    path: 'facility', children: [
      { path: '', component: CaseFacilityShellComponent },
      { path: ':search', component: CaseFacilityMobileComponent }
    ]
  },
  {
    path: 'residence', children: [
      { path: '', component: CaseResidenceShellComponent },
      { path: ':search', component: CaseResidenceMobileComponent }
    ]
  },
  { path: '', component: CaseMasterShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseRoutingModule { }
