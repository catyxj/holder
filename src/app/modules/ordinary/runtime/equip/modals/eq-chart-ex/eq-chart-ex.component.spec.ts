import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqChartExComponent } from './eq-chart-ex.component';

describe('EqChartExComponent', () => {
  let component: EqChartExComponent;
  let fixture: ComponentFixture<EqChartExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqChartExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqChartExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
