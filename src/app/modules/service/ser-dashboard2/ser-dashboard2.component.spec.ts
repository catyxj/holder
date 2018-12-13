import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerDashboard2Component } from './ser-dashboard2.component';

describe('SerDashboard2Component', () => {
  let component: SerDashboard2Component;
  let fixture: ComponentFixture<SerDashboard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerDashboard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerDashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
