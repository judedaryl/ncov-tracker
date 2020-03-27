import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseListComponent implements OnInit {

  @Input() data: PHCase[];
  @Input() clickable: boolean = false;
  @Input() cardClickable: boolean = false;
  @Output() select = new EventEmitter<PHCase>();


  constructor() { }

  ngOnInit() {
  }

  onSelect(phcase: PHCase) {
    if (this.cardClickable) {
      this.select.emit(phcase);
    }
  }

  trackByFunction(index: number) {
    return index;
  }

}
