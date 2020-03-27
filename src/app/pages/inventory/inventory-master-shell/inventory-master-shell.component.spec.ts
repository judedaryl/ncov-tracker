import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMasterShellComponent } from './inventory-master-shell.component';

describe('InventoryMasterShellComponent', () => {
  let component: InventoryMasterShellComponent;
  let fixture: ComponentFixture<InventoryMasterShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryMasterShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMasterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
