import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiRegionShellComponent } from './pui-region-shell.component';

describe('PuiRegionShellComponent', () => {
  let component: PuiRegionShellComponent;
  let fixture: ComponentFixture<PuiRegionShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiRegionShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiRegionShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
