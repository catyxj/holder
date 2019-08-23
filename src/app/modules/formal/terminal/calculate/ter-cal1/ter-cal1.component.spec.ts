import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerCal1Component } from './ter-cal1.component';

describe('TerCal1Component', () => {
  let component: TerCal1Component;
  let fixture: ComponentFixture<TerCal1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerCal1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerCal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
