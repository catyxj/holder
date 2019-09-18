import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceMainDirComponent } from './order-service-main-dir.component';

describe('OrderServiceMainDirComponent', () => {
  let component: OrderServiceMainDirComponent;
  let fixture: ComponentFixture<OrderServiceMainDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderServiceMainDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceMainDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
