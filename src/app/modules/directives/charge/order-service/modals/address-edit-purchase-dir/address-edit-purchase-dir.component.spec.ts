import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEditPurchaseDirComponent } from './address-edit-purchase-dir.component';

describe('AddressEditPurchaseDirComponent', () => {
  let component: AddressEditPurchaseDirComponent;
  let fixture: ComponentFixture<AddressEditPurchaseDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressEditPurchaseDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressEditPurchaseDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
