import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindReportComponent } from './remind-report.component';

describe('RemindReportComponent', () => {
  let component: RemindReportComponent;
  let fixture: ComponentFixture<RemindReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
