import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindReportMainComponent } from './remind-report-main.component';

describe('RemindReportMainComponent', () => {
  let component: RemindReportMainComponent;
  let fixture: ComponentFixture<RemindReportMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindReportMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindReportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
