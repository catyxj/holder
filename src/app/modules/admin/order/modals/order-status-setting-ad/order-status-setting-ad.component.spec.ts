import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusSettingAdComponent } from './order-status-setting-ad.component';

describe('OrderStatusSettingAdComponent', () => {
  let component: OrderStatusSettingAdComponent;
  let fixture: ComponentFixture<OrderStatusSettingAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusSettingAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusSettingAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
