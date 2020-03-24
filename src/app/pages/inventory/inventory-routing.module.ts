import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryShellComponent } from './inventory-shell/inventory-shell.component';


const routes: Routes = [
  { path: 'region', component: InventoryShellComponent },
  { path: '', redirectTo: 'region', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
