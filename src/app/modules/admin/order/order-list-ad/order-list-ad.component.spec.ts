import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListAdComponent } from './order-list-ad.component';

describe('OrderListAdComponent', () => {
  let component: OrderListAdComponent;
  let fixture: ComponentFixture<OrderListAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
