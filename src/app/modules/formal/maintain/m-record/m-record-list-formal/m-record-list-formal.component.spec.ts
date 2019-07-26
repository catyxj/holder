import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRecordListFormalComponent } from './m-record-list-formal.component';

describe('MRecordListFormalComponent', () => {
  let component: MRecordListFormalComponent;
  let fixture: ComponentFixture<MRecordListFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRecordListFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRecordListFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
