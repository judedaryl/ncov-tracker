import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  showChanges: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {}

  show() {
    this.showChanges.next(true);
  }

  hide() {
    this.showChanges.next(false);
  }
}
