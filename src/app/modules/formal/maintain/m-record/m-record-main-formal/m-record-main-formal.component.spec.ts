import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRecordMainFormalComponent } from './m-record-main-formal.component';

describe('MRecordMainFormalComponent', () => {
  let component: MRecordMainFormalComponent;
  let fixture: ComponentFixture<MRecordMainFormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRecordMainFormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRecordMainFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
