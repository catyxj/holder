import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillGeneralDirComponent } from './bill-general-dir.component';

describe('BillGeneralDirComponent', () => {
  let component: BillGeneralDirComponent;
  let fixture: ComponentFixture<BillGeneralDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillGeneralDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillGeneralDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
