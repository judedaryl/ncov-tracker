import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { OpenSourceComponent } from './open-source/open-source.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent }, 
  { path: 'open-source', component: OpenSourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
