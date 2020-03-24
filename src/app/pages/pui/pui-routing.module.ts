import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PuiRegionShellComponent } from './pui-region-shell/pui-region-shell.component';
import { PuiFacilityShellComponent } from './pui-facility-shell/pui-facility-shell.component';
import { PuiFacilityMobileComponent } from './pui-facility-mobile/pui-facility-mobile.component';
import { PuiRegionMobileComponent } from './pui-region-mobile/pui-region-mobile.component';


const routes: Routes = [
  {
    path: 'facility', children: [
      { path: '', component: PuiFacilityShellComponent },
      { path: ':search', component: PuiFacilityMobileComponent }
    ]
  },
  {
    path: 'region', children: [
      { path: '', component: PuiRegionShellComponent },
      { path: ':search', component: PuiRegionMobileComponent }
    ]
  },
  { path: '', redirectTo: 'facility', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuiRoutingModule { }
