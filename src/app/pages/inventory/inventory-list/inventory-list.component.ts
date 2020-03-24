import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  @Input() data: Aggregate<PHCase>[]
  @Output() select = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

}