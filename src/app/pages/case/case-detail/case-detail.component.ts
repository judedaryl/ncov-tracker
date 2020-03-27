import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PHCase } from 'src/app/arcgis/ph-masterlist';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseDetailComponent implements OnInit {
  @Input() item: PHCase;
  @Output() select = new EventEmitter<PHCase>();
  @Input() clickable: boolean = false;
  @Input() cardClickable: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSelect(phcase: PHCase) {
    if (this.cardClickable) {
      this.select.emit(phcase);
    }
  }


}
