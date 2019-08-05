import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRecordInfoFormalComponent } from './m-record-info-formal.component';

describe('MRecordInfoFormalComponent', () => {
  let component: MRecordInfoFormalComponent;
  let fixture: ComponentFixture<MRecordInfoFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRecordInfoFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRecordInfoFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
