import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryItemComponent } from './add-delivery-item.component';

describe('AddDeliveryItemComponent', () => {
  let component: AddDeliveryItemComponent;
  let fixture: ComponentFixture<AddDeliveryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeliveryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
