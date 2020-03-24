import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiFacilityMobileComponent } from './pui-facility-mobile.component';

describe('PuiFacilityMobileComponent', () => {
  let component: PuiFacilityMobileComponent;
  let fixture: ComponentFixture<PuiFacilityMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiFacilityMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiFacilityMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
