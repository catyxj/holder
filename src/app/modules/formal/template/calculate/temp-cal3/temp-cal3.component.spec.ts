import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCal3Component } from './temp-cal3.component';

describe('TempCal3Component', () => {
  let component: TempCal3Component;
  let fixture: ComponentFixture<TempCal3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempCal3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempCal3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
