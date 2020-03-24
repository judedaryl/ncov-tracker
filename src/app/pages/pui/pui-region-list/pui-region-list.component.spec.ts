import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiRegionListComponent } from './pui-region-list.component';

describe('PuiRegionListComponent', () => {
  let component: PuiRegionListComponent;
  let fixture: ComponentFixture<PuiRegionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuiRegionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiRegionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
