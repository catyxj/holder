import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainRecordMainSerComponent } from './maintain-record-main-ser.component';

describe('MaintainRecordMainSerComponent', () => {
  let component: MaintainRecordMainSerComponent;
  let fixture: ComponentFixture<MaintainRecordMainSerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainRecordMainSerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainRecordMainSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
