import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailDirComponent } from './bill-detail-dir.component';

describe('BillDetailDirComponent', () => {
  let component: BillDetailDirComponent;
  let fixture: ComponentFixture<BillDetailDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetailDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetailDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
