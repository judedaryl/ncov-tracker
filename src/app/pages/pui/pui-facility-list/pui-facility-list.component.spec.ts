import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiFacilityListComponent } from './pui-facility-list.component';

describe('PuiFacilityListComponent', () => {
  let component: PuiFacilityListComponent;
  let fixture: ComponentFixture<PuiFacilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiFacilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiFacilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
