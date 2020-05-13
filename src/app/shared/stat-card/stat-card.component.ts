import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-stat-card",
  templateUrl: "./stat-card.component.html",
  styleUrls: ["./stat-card.component.scss"],
})
export class StatCardComponent implements OnInit {
  @Input() headerIcon: string;
  @Input() value: string;
  @Input() title: string;
  @Input() information: string;
  @Input() textColor: string;
  @Input() bgColor: string;

  constructor() {}

  ngOnInit() {}
}
