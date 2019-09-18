import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAddPurchaseDirComponent } from './address-add-purchase-dir.component';

describe('AddressAddPurchaseDirComponent', () => {
  let component: AddressAddPurchaseDirComponent;
  let fixture: ComponentFixture<AddressAddPurchaseDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAddPurchaseDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAddPurchaseDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
