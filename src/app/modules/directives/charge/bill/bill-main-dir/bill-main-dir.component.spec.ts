import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillMainDirComponent } from './bill-main-dir.component';

describe('BillMainDirComponent', () => {
  let component: BillMainDirComponent;
  let fixture: ComponentFixture<BillMainDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillMainDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillMainDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
