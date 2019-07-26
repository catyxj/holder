import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainRecordListSerComponent } from './maintain-record-list-ser.component';

describe('MaintainRecordListSerComponent', () => {
  let component: MaintainRecordListSerComponent;
  let fixture: ComponentFixture<MaintainRecordListSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainRecordListSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainRecordListSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
