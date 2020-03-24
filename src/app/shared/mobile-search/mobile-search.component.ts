import { Component, OnInit, Output, OnDestroy, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-search',
  templateUrl: './mobile-search.component.html',
  styleUrls: ['./mobile-search.component.scss']
})
export class MobileSearchComponent implements OnInit, OnDestroy {

  @Input() backLink: string = '/';
  @Input() placeholder: string;
  @Output() search = new EventEmitter<string>();

  searchCtrl = new FormControl('');
  searchSub: Subscription;
  isNotEmpty$ = this.searchCtrl.valueChanges.pipe(
    map(value => typeof value !== 'undefined' && value !== null && value !== '')
  )
  constructor() { }


  ngOnInit() {
    this.searchSub = this.searchCtrl.valueChanges.subscribe(searchVal => {
      this.search.emit(searchVal);
    });
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

}
