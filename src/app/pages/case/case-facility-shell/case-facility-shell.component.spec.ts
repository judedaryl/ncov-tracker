import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFacilityShellComponent } from './case-facility-shell.component';

describe('CaseFacilityShellComponent', () => {
  let component: CaseFacilityShellComponent;
  let fixture: ComponentFixture<CaseFacilityShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFacilityShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFacilityShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
