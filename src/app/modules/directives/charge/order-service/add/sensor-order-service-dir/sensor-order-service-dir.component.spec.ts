import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorOrderServiceDirComponent } from './sensor-order-service-dir.component';

describe('SensorOrderServiceDirComponent', () => {
  let component: SensorOrderServiceDirComponent;
  let fixture: ComponentFixture<SensorOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
