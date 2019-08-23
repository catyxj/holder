import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindOverdue2Component } from './remind-overdue2.component';

describe('RemindOverdue2Component', () => {
  let component: RemindOverdue2Component;
  let fixture: ComponentFixture<RemindOverdue2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindOverdue2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindOverdue2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
