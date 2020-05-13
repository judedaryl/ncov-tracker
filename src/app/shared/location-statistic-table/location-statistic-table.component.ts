import { Component, OnInit, Input, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { LocationStatistic } from 'src/app/models/location-statistic';
import { SortEvent, SortableHeader } from 'src/app/directives/sortable-header.directive';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-location-statistic-table',
  templateUrl: './location-statistic-table.component.html',
  styleUrls: ['./location-statistic-table.component.scss']
})
export class LocationStatisticTableComponent implements OnInit {

  @Input() data: LocationStatistic[] = [];
  _data: Observable<LocationStatistic[]>;
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  searchControl = new FormControl('');
  sortEvent = new BehaviorSubject<SortEvent>({
    direction: '',
    column: ''
  });
  pageChanged = new BehaviorSubject<PageChangedEvent>({
    itemsPerPage: 10,
    page: 1
  });

  totalItems = 0;

  constructor() { }

  ngOnInit() {
    this._data = combineLatest(this.searchControl.valueChanges.pipe(startWith('')), this.sortEvent, this.pageChanged).pipe(
      startWith({}),
      map(() => {
        const search = this.searchControl.value;
        const { column, direction } = this.sortEvent.value;
        const { itemsPerPage, page } = this.pageChanged.value;
        
        this.headers && this.headers.forEach(header => {
          if (header.sortable !== column) {
            header.direction = '';
          }
        });

        // filtering
        let _data = this.data.filter(q => q.name.toLowerCase().includes(search.toLowerCase()))

            
        // sorting
        if (direction === '' || column === '') {
          _data = _data;
        } else {
          _data = [..._data].sort((a, b) => {

            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
          });
        }

        // paging
        let _page = page - 1;
        this.totalItems = _data.length;
        _data = _data.slice(_page * itemsPerPage, (_page * itemsPerPage) + itemsPerPage)
        return _data
      })
    )
  }
}
