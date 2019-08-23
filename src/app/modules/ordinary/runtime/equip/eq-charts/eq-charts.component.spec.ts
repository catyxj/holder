import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqChartsComponent } from './eq-charts.component';

describe('EqChartsComponent', () => {
  let component: EqChartsComponent;
  let fixture: ComponentFixture<EqChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
