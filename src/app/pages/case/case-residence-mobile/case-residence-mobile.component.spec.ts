import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseResidenceMobileComponent } from './case-residence-mobile.component';

describe('CaseResidenceMobileComponent', () => {
  let component: CaseResidenceMobileComponent;
  let fixture: ComponentFixture<CaseResidenceMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseResidenceMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseResidenceMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
