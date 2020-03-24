import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFacilityListComponent } from './case-facility-list.component';

describe('CaseFacilityListComponent', () => {
  let component: CaseFacilityListComponent;
  let fixture: ComponentFixture<CaseFacilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFacilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFacilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
