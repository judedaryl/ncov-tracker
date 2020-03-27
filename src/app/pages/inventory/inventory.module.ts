import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryShellComponent } from './inventory-shell/inventory-shell.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule, BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { InventoryMasterShellComponent } from './inventory-master-shell/inventory-master-shell.component';


@NgModule({
  declarations: [InventoryShellComponent, InventoryListComponent, InventoryMasterShellComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
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
export class InventoryModule { }
