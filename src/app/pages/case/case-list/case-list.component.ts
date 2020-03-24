import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  @Input() data: PHCase[];
  @Input() clickable: boolean = false;
  @Output() select = new EventEmitter<string>()
  constructor() { }

  ngOnInit() {
  }

}
