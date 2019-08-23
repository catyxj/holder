import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCal1Component } from './temp-cal1.component';

describe('TempCal1Component', () => {
  let component: TempCal1Component;
  let fixture: ComponentFixture<TempCal1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempCal1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempCal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
