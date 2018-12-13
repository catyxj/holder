import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerDashboard3Component } from './ser-dashboard3.component';

describe('SerDashboard3Component', () => {
  let component: SerDashboard3Component;
  let fixture: ComponentFixture<SerDashboard3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerDashboard3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerDashboard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
