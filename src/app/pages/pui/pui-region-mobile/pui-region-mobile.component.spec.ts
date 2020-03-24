import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiRegionMobileComponent } from './pui-region-mobile.component';

describe('PuiRegionMobileComponent', () => {
  let component: PuiRegionMobileComponent;
  let fixture: ComponentFixture<PuiRegionMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiRegionMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiRegionMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
