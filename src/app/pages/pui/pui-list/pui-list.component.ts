import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PuiTracing } from 'src/app/arcgis/pui-tracing';

@Component({
  selector: 'app-pui-list',
  templateUrl: './pui-list.component.html',
  styleUrls: ['./pui-list.component.scss']
})
export class PuiListComponent implements OnInit {

  @Input() data: PuiTracing[]
  @Output() select = new EventEmitter<PuiTracing>();
  
  constructor() { }

  ngOnInit() {
  }

}
