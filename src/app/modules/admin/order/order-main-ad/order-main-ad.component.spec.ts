import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMainAdComponent } from './order-main-ad.component';

describe('OrderMainAdComponent', () => {
  let component: OrderMainAdComponent;
  let fixture: ComponentFixture<OrderMainAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMainAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMainAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
