import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiDetailComponent } from './pui-detail.component';

describe('PuiDetailComponent', () => {
  let component: PuiDetailComponent;
  let fixture: ComponentFixture<PuiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
