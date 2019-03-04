import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMainComponent } from './attendance-main.component';

describe('AttendanceMainComponent', () => {
  let component: AttendanceMainComponent;
  let fixture: ComponentFixture<AttendanceMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
