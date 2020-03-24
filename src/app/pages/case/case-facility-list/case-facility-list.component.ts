import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PHCase } from 'src/app/arcgis/ph-masterlist';
import { Aggregate } from 'src/app/arcgis/aggregate';

@Component({
  selector: 'app-case-facility-list',
  templateUrl: './case-facility-list.component.html',
  styleUrls: ['./case-facility-list.component.scss']
})
export class CaseFacilityListComponent implements OnInit {

  @Input() data: Aggregate<PHCase>[]
  @Output() select = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

}
