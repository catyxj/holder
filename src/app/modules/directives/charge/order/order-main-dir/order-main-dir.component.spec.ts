import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMainDirComponent } from './order-main-dir.component';

describe('OrderMainDirComponent', () => {
  let component: OrderMainDirComponent;
  let fixture: ComponentFixture<OrderMainDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMainDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMainDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
