import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvDashboardAdComponent } from './ov-dashboard-ad.component';

describe('OvDashboardAdComponent', () => {
  let component: OvDashboardAdComponent;
  let fixture: ComponentFixture<OvDashboardAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvDashboardAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvDashboardAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
