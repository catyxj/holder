import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeAlarmMainComponent } from './runtime-alarm-main.component';

describe('RuntimeAlarmMainComponent', () => {
  let component: RuntimeAlarmMainComponent;
  let fixture: ComponentFixture<RuntimeAlarmMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeAlarmMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeAlarmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
