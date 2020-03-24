import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenceChartComponent } from './residence-chart.component';

describe('ResidenceChartComponent', () => {
  let component: ResidenceChartComponent;
  let fixture: ComponentFixture<ResidenceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
