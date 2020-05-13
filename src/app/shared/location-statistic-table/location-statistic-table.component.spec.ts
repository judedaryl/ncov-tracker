import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStatisticTableComponent } from './location-statistic-table.component';

describe('LocationStatisticTableComponent', () => {
  let component: LocationStatisticTableComponent;
  let fixture: ComponentFixture<LocationStatisticTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationStatisticTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationStatisticTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
