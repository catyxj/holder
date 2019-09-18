import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothOrderServiceDirComponent } from './bluetooth-order-service-dir.component';

describe('BluetoothOrderServiceDirComponent', () => {
  let component: BluetoothOrderServiceDirComponent;
  let fixture: ComponentFixture<BluetoothOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
