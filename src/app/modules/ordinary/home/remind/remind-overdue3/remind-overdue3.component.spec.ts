import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindOverdue3Component } from './remind-overdue3.component';

describe('RemindOverdue3Component', () => {
  let component: RemindOverdue3Component;
  let fixture: ComponentFixture<RemindOverdue3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindOverdue3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindOverdue3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
