import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Inventory } from 'src/app/arcgis/inventory';
import { InventoryApiService } from 'src/app/services/inventory-api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-inventory-shell',
  templateUrl: './inventory-shell.component.html',
  styleUrls: ['./inventory-shell.component.scss']
})
export class InventoryShellComponent implements OnInit, OnDestroy {

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''))
  data$: Observable<Inventory[]>;
  isMobile$: Observable<boolean>;

  constructor(
    private inventoryService: InventoryApiService,
    breakpointObserver: BreakpointObserver
    ) {
      this.isMobile$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait
      ]).pipe(
        map(({ matches }) => matches)
      )
    }

  ngOnInit() {

    this.data$ = combineLatest(this.inventoryService.getInventoryStatistics(), this.filter$).pipe(
      map(([data, filterString]) => data.filter(({ region }) =>
      region.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    )
  }

  ngOnDestroy() {
  }

}