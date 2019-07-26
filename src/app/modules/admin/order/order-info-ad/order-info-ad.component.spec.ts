import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoAdComponent } from './order-info-ad.component';

describe('OrderInfoAdComponent', () => {
  let component: OrderInfoAdComponent;
  let fixture: ComponentFixture<OrderInfoAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
