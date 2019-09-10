import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeOverviewDirComponent } from './charge-overview-dir.component';

describe('ChargeOverviewDirComponent', () => {
  let component: ChargeOverviewDirComponent;
  let fixture: ComponentFixture<ChargeOverviewDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeOverviewDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeOverviewDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
