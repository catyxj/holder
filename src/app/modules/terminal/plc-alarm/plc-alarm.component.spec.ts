import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlcAlarmComponent } from './plc-alarm.component';

describe('PlcAlarmComponent', () => {
  let component: PlcAlarmComponent;
  let fixture: ComponentFixture<PlcAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlcAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlcAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
