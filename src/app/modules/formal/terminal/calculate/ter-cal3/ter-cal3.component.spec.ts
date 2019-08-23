import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerCal3Component } from './ter-cal3.component';

describe('TerCal3Component', () => {
  let component: TerCal3Component;
  let fixture: ComponentFixture<TerCal3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerCal3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerCal3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
