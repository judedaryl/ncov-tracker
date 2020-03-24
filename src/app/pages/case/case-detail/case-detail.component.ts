import { Component, OnInit, Input } from '@angular/core';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {
  @Input() data: PHCase[]
  constructor() { }

  ngOnInit() {
  }

}
