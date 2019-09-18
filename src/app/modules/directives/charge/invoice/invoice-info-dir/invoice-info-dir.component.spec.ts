import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInfoDirComponent } from './invoice-info-dir.component';

describe('InvoiceInfoDirComponent', () => {
  let component: InvoiceInfoDirComponent;
  let fixture: ComponentFixture<InvoiceInfoDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceInfoDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceInfoDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
