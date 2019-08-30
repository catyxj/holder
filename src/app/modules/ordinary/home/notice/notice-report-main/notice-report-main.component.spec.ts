import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeReportMainComponent } from './notice-report-main.component';

describe('NoticeReportMainComponent', () => {
  let component: NoticeReportMainComponent;
  let fixture: ComponentFixture<NoticeReportMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeReportMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeReportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
