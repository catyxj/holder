import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerCal2Component } from './ter-cal2.component';

describe('TerCal2Component', () => {
  let component: TerCal2Component;
  let fixture: ComponentFixture<TerCal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerCal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerCal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
