import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficOrderServiceDirComponent } from './traffic-order-service-dir.component';

describe('TrafficOrderServiceDirComponent', () => {
  let component: TrafficOrderServiceDirComponent;
  let fixture: ComponentFixture<TrafficOrderServiceDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficOrderServiceDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficOrderServiceDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
