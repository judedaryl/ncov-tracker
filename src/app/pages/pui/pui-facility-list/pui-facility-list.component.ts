import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';
import { Aggregate } from 'src/app/arcgis/aggregate';

@Component({
  selector: 'app-pui-facility-list',
  templateUrl: './pui-facility-list.component.html',
  styleUrls: ['./pui-facility-list.component.scss']
})
export class PuiFacilityListComponent implements OnInit {

  @Input() data: Aggregate<PuiTracing>[]
  @Output() select = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

}
