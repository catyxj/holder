import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoDirComponent } from './order-info-dir.component';

describe('OrderInfoDirComponent', () => {
  let component: OrderInfoDirComponent;
  let fixture: ComponentFixture<OrderInfoDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
