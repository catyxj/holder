import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempAddCalc1Component } from './temp-add-calc1.component';

describe('TempAddCalc1Component', () => {
  let component: TempAddCalc1Component;
  let fixture: ComponentFixture<TempAddCalc1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempAddCalc1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempAddCalc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
