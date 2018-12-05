import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainDashboardComponent } from './maintain-dashboard.component';

describe('MaintainDashboardComponent', () => {
  let component: MaintainDashboardComponent;
  let fixture: ComponentFixture<MaintainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
