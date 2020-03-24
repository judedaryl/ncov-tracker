import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';

@Component({
  selector: 'app-pui-region-list',
  templateUrl: './pui-region-list.component.html',
  styleUrls: ['./pui-region-list.component.scss']
})
export class PuiRegionListComponent implements OnInit {

  @Input() data: Aggregate<PuiTracing>[]
  @Output() select = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

}
