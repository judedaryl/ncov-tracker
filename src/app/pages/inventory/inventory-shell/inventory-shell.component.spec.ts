import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryShellComponent } from './inventory-shell.component';

describe('InventoryShellComponent', () => {
  let component: InventoryShellComponent;
  let fixture: ComponentFixture<InventoryShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
