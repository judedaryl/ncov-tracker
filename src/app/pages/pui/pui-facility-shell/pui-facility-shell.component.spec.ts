import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiFacilityShellComponent } from './pui-facility-shell.component';

describe('PuiFacilityShellComponent', () => {
  let component: PuiFacilityShellComponent;
  let fixture: ComponentFixture<PuiFacilityShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiFacilityShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiFacilityShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
