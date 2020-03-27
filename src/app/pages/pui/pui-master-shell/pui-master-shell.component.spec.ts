import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiMasterShellComponent } from './pui-master-shell.component';

describe('PuiMasterShellComponent', () => {
  let component: PuiMasterShellComponent;
  let fixture: ComponentFixture<PuiMasterShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiMasterShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiMasterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
