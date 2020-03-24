import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFacilityMobileComponent } from './case-facility-mobile.component';

describe('CaseFacilityMobileComponent', () => {
  let component: CaseFacilityMobileComponent;
  let fixture: ComponentFixture<CaseFacilityMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFacilityMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFacilityMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
