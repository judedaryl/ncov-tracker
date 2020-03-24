import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseResidenceShellComponent } from './case-residence-shell.component';

describe('CaseResidenceShellComponent', () => {
  let component: CaseResidenceShellComponent;
  let fixture: ComponentFixture<CaseResidenceShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseResidenceShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseResidenceShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
