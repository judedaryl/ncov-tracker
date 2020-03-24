import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiListComponent } from './pui-list.component';

describe('PuiListComponent', () => {
  let component: PuiListComponent;
  let fixture: ComponentFixture<PuiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
