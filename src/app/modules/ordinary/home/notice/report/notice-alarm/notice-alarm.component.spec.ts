import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeAlarmComponent } from './notice-alarm.component';

describe('NoticeAlarmComponent', () => {
  let component: NoticeAlarmComponent;
  let fixture: ComponentFixture<NoticeAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
