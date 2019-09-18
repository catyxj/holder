import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListDirComponent } from './order-list-dir.component';

describe('OrderListDirComponent', () => {
  let component: OrderListDirComponent;
  let fixture: ComponentFixture<OrderListDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
