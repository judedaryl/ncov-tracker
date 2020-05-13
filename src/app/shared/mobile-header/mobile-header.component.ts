import { Component, OnInit, Input } from "@angular/core";
@Component({
  selector: "app-mobile-header",
  templateUrl: "./mobile-header.component.html",
  styleUrls: ["./mobile-header.component.scss"],
})
export class MobileHeaderComponent implements OnInit {
  @Input() backLink: string = "/";
  constructor() {}

  ngOnInit() {}
}
