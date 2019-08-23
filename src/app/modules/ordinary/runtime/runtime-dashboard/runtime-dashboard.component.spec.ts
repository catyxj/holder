import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeDashboardComponent } from './runtime-dashboard.component';

describe('RuntimeDashboardComponent', () => {
  let component: RuntimeDashboardComponent;
  let fixture: ComponentFixture<RuntimeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
