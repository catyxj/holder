import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceDashboardDirComponent } from './order-service-dashboard-dir.component';

describe('OrderServiceDashboardDirComponent', () => {
  let component: OrderServiceDashboardDirComponent;
  let fixture: ComponentFixture<OrderServiceDashboardDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderServiceDashboardDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceDashboardDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
