import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseResidenceListComponent } from './case-residence-list.component';

describe('CaseResidenceListComponent', () => {
  let component: CaseResidenceListComponent;
  let fixture: ComponentFixture<CaseResidenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseResidenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseResidenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
