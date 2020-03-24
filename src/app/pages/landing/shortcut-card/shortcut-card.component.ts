import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shortcut-card',
  templateUrl: './shortcut-card.component.html',
  styleUrls: ['./shortcut-card.component.scss']
})
export class ShortcutCardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  
  constructor() { }

  ngOnInit() {
  }

}
