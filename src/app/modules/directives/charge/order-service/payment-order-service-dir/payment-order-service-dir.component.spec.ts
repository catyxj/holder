import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderServiceDirComponent } from './payment-order-service-dir.component';

describe('PaymentOrderServiceDirComponent', () => {
  let component: PaymentOrderServiceDirComponent;
  let fixture: ComponentFixture<PaymentOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
