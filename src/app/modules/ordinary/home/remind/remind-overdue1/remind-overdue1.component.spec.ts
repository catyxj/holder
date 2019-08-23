import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindOverdue1Component } from './remind-overdue1.component';

describe('RemindOverdue1Component', () => {
  let component: RemindOverdue1Component;
  let fixture: ComponentFixture<RemindOverdue1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindOverdue1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindOverdue1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
