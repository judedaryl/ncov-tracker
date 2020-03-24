import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityChartComponent } from './nationality-chart.component';

describe('NationalityChartComponent', () => {
  let component: NationalityChartComponent;
  let fixture: ComponentFixture<NationalityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
