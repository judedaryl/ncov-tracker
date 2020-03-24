import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aggregate } from 'src/app/arcgis/aggregate';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-case-residence-list',
  templateUrl: './case-residence-list.component.html',
  styleUrls: ['./case-residence-list.component.scss']
})
export class CaseResidenceListComponent implements OnInit {

  @Input() data: Aggregate<PHCase>[]
  @Output() select = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

}
