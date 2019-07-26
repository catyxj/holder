import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CluDashboardComponent } from './clu-dashboard.component';

describe('CluDashboardComponent', () => {
  let component: CluDashboardComponent;
  let fixture: ComponentFixture<CluDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CluDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CluDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
