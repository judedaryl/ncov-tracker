import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMasterShellComponent } from './case-master-shell.component';

describe('CaseMasterShellComponent', () => {
  let component: CaseMasterShellComponent;
  let fixture: ComponentFixture<CaseMasterShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseMasterShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseMasterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
