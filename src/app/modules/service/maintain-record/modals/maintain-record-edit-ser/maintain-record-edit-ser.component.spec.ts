import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainRecordEditSerComponent } from './maintain-record-edit-ser.component';

describe('MaintainRecordEditSerComponent', () => {
  let component: MaintainRecordEditSerComponent;
  let fixture: ComponentFixture<MaintainRecordEditSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainRecordEditSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainRecordEditSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
