import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCal2Component } from './temp-cal2.component';

describe('TempCal2Component', () => {
  let component: TempCal2Component;
  let fixture: ComponentFixture<TempCal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempCal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempCal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
