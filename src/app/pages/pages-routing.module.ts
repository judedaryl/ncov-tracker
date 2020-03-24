import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotfoundComponent } from './error/notfound/notfound.component';
import { AboutComponent } from './about/about.component';
import { OpenSourceComponent } from './open-source/open-source.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(q => q.InventoryModule) },
  { path: 'case', loadChildren: () => import('./case/case.module').then(q => q.CaseModule) },
  { path: 'pui', loadChildren: () => import('./pui/pui.module').then(q => q.PuiModule) },
  { path: 'about', component: AboutComponent }, 
  { path: 'open-source', component: OpenSourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
