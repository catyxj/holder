import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VDashboardComponent } from './v-dashboard.component';

describe('VDashboardComponent', () => {
  let component: VDashboardComponent;
  let fixture: ComponentFixture<VDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
