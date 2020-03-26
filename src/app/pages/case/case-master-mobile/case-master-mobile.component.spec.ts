import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMasterMobileComponent } from './case-master-mobile.component';

describe('CaseMasterMobileComponent', () => {
  let component: CaseMasterMobileComponent;
  let fixture: ComponentFixture<CaseMasterMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseMasterMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseMasterMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
